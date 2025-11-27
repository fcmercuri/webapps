require('dotenv').config({ path: 'mongo.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'],
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Models
const User = require('./models/User');
const Persona = require('./models/Persona');
const Prompt = require('./models/Prompt');
const Content = require('./models/Content');

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- AUTH MIDDLEWARE ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// --- ROUTES ---

app.get('/', (req, res) => {
  res.send('SocialSage API is running');
});

// --- AUTH ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });
    
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: 'Email already registered' });
    
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    
    console.log('User registered:', email);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'SECRET_KEY', 
      { expiresIn: '7d' }
    );
    
    console.log('User logged in:', email);
    res.json({ token, user: { id: user._id, email: user.email, industry: user.industry, isPremium: user.isPremium } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- USER PROFILE ---
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/user/industry', authenticateToken, async (req, res) => {
  try {
    const { industry } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { industry }, { new: true }).select('-password');
    console.log('User industry updated:', user.email, industry);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update industry' });
  }
});

// --- PERSONAS ---
app.post('/api/personas/generate', authenticateToken, async (req, res) => {
  try {
    const { industry } = req.body;
    
    if (!industry) {
      return res.status(400).json({ error: 'Industry is required' });
    }

    // AI Generate 4 personas (1 free, 3 premium)
    const prompt = `You are a marketing strategist. Generate 4 detailed customer personas for the ${industry} industry.

For each persona, provide:
1. Name (realistic)
2. Age
3. Bio (2-3 sentences about their role and life)
4. Goals (3 specific goals)
5. Pain Points (3 specific challenges)

Format as JSON array with keys: name, age, bio, goals (array), painPoints (array).

Make personas diverse and realistic for ${industry}.`;

    console.log('Generating personas for industry:', industry);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500
    });

    const content = response.choices[0].message.content;
    
    // Parse JSON from response
    let personas;
    try {
      personas = JSON.parse(content);
    } catch (e) {
      // If OpenAI returns text instead of pure JSON, try to extract JSON
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        personas = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse personas from AI response');
      }
    }

    // Save personas to DB (first is free, rest are premium)
    const savedPersonas = [];
    for (let i = 0; i < personas.length && i < 4; i++) {
      const personaData = personas[i];
      const persona = new Persona({
        ...personaData,
        industry,
        userId: req.userId,
        isPremium: i > 0, // First persona is free, rest are premium
        avatar: `👤` // Default emoji, can be enhanced
      });
      await persona.save();
      savedPersonas.push(persona);
    }

    console.log(`Generated ${savedPersonas.length} personas for ${industry}`);
    res.json(savedPersonas);
  } catch (err) {
    console.error('Persona generation error:', err);
    res.status(500).json({ error: 'Failed to generate personas' });
  }
});

app.get('/api/personas', authenticateToken, async (req, res) => {
  try {
    const personas = await Persona.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(personas);
  } catch (err) {
    console.error('Error fetching personas:', err);
    res.status(500).json({ error: 'Failed to fetch personas' });
  }
});

// --- PROMPTS ---
app.post('/api/prompts/generate', authenticateToken, async (req, res) => {
  try {
    const { personaId } = req.body;
    
    if (!personaId) {
      return res.status(400).json({ error: 'Persona ID is required' });
    }

    const persona = await Persona.findById(personaId);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    // AI Generate synthetic prompts based on persona
    const prompt = `You are a content strategist. Based on this customer persona:
Name: ${persona.name}
Bio: ${persona.bio}
Goals: ${persona.goals.join(', ')}
Pain Points: ${persona.painPoints.join(', ')}

Generate 5 specific content prompts this persona would search for or need. Include:
1. Title (short, actionable)
2. Description (1 sentence)
3. Category (one of: SEO, Social, Blog, Website, Email)

Format as JSON array with keys: title, description, category.`;

    console.log('Generating prompts for persona:', persona.name);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800
    });

    const content = response.choices[0].message.content;
    
    let prompts;
    try {
      prompts = JSON.parse(content);
    } catch (e) {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        prompts = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse prompts from AI response');
      }
    }

    // Save prompts to DB
    const savedPrompts = [];
    for (const promptData of prompts) {
      const newPrompt = new Prompt({
        ...promptData,
        personaId,
        userId: req.userId
      });
      await newPrompt.save();
      savedPrompts.push(newPrompt);
    }

    console.log(`Generated ${savedPrompts.length} prompts for ${persona.name}`);
    res.json(savedPrompts);
  } catch (err) {
    console.error('Prompt generation error:', err);
    res.status(500).json({ error: 'Failed to generate prompts' });
  }
});

app.get('/api/prompts', authenticateToken, async (req, res) => {
  try {
    const { personaId } = req.query;
    const filter = { userId: req.userId };
    if (personaId) filter.personaId = personaId;
    
    const prompts = await Prompt.find(filter).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (err) {
    console.error('Error fetching prompts:', err);
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

// --- CONTENT GENERATION ---
app.post('/api/content/generate', authenticateToken, async (req, res) => {
  try {
    const { promptId, type } = req.body;
    
    if (!promptId) {
      return res.status(400).json({ error: 'Prompt ID is required' });
    }

    const prompt = await Prompt.findById(promptId).populate('personaId');
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    const persona = prompt.personaId;

    // AI Generate content based on prompt and persona
    const aiPrompt = `You are a professional copywriter. Write ${type || 'website'} content for:

Prompt: ${prompt.title}
Description: ${prompt.description}
Category: ${prompt.category}

Target Persona:
- Name: ${persona.name}
- Goals: ${persona.goals.join(', ')}
- Pain Points: ${persona.painPoints.join(', ')}

Write compelling, conversion-focused copy (300-500 words) that addresses their needs.`;

    console.log('Generating content for prompt:', prompt.title);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: aiPrompt }],
      max_tokens: 1000
    });

    const body = response.choices[0].message.content;

    // Save content to DB
    const content = new Content({
      title: prompt.title,
      body,
      type: type || 'website',
      promptId,
      personaId: persona._id,
      userId: req.userId
    });
    await content.save();

    console.log('Content generated for:', prompt.title);
    res.json(content);
  } catch (err) {
    console.error('Content generation error:', err);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.get('/api/content', authenticateToken, async (req, res) => {
  try {
    const content = await Content.find({ userId: req.userId })
      .populate('promptId')
      .populate('personaId')
      .sort({ createdAt: -1 });
    res.json(content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});
