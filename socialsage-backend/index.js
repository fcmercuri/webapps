require('dotenv').config({ path: 'mongo.env' });
console.log('STRIPE_SECRET_KEY present?', !!process.env.STRIPE_SECRET_KEY);

const Persona = require('./models/Persona');
const Prompt = require('./models/Prompt');
const Content = require('./models/Content');
const User = require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://socialsage-frontend.onrender.com',
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// --- PERPLEXITY HELPER ---
async function callPerplexity(system, prompt, model = 'sonar') {
  const url = 'https://api.perplexity.ai/chat/completions';

  const response = await axios.post(
    url,
    {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}

// --- STRIPE CHECKOUT SESSION ROUTE ---
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, customerEmail } = req.body;

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://socialsage-frontend.onrender.com'
        : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// --- STRIPE VERIFY SESSION ROUTE ---
app.post('/api/stripe/verify-session', async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      console.log('Payment not completed or subscription missing.');
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const email = session.customer_email;
    console.log('Payment is paid. Looking up user by email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found in database for email:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 1,
    });
    const priceId = lineItems.data[0]?.price?.id;

    if (priceId === process.env.STRIPE_PRICE_STARTER) {
      user.plan = 'starter';
      user.isPremium = true;
    } else if (priceId === process.env.STRIPE_PRICE_PRO) {
      user.plan = 'pro';
      user.isPremium = true;
    }

    await user.save();

    console.log('User upgraded, plan:', user.plan);
    return res.json({ message: 'Payment verified', plan: user.plan });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Using Perplexity API`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('SocialSage API is running with Perplexity AI');
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

    console.log('✅ User registered:', email);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res
      .status(400)
      .json({ error: 'Registration failed', details: err.message });
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

    console.log('✅ User logged in:', email);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        industry: user.industry,
        isPremium: user.isPremium,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
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
    const user = await User.findByIdAndUpdate(
      req.userId,
      { industry },
      { new: true }
    ).select('-password');
    console.log('✅ User industry updated:', user.email, industry);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update industry' });
  }
});

// --- PERSONAS (WITH PERPLEXITY) ---
app.post('/api/personas/generate', authenticateToken, async (req, res) => {
  try {
    const { industry } = req.body;

    if (!industry) {
      return res.status(400).json({ error: 'Industry is required' });
    }

    const user = await User.findById(req.userId);
    const personaCount = await Persona.countDocuments({ userId: req.userId });

    if (user.plan === 'free' && personaCount >= 1) {
      return res
        .status(403)
        .json({
          error:
            'Free plan allows only 1 persona. Upgrade to Starter for more.',
        });
    }

    if (user.plan === 'starter' && personaCount >= 5) {
      return res
        .status(403)
        .json({
          error:
            'Starter plan allows up to 5 personas. Upgrade to Pro for unlimited personas.',
        });
    }

    const systemPrompt =
      'You are a marketing strategist expert. You MUST respond with ONLY valid JSON - no markdown, no explanations, no code blocks. Just pure JSON array.';

    const userPrompt = `Generate exactly 4 customer personas for the ${industry} industry.

Return ONLY a JSON array (no markdown, no code blocks, no explanations) with this exact structure:

[
  {
    "name": "Full Name",
    "age": 35,
    "bio": "2-3 sentence bio about role and life",
    "goals": ["goal 1", "goal 2", "goal 3"],
    "painPoints": ["pain 1", "pain 2", "pain 3"]
  }
]

Make personas diverse, realistic, and specific to ${industry}.`;

    console.log('🔄 Generating personas for industry:', industry);

    const content = await callPerplexity(systemPrompt, userPrompt, 'sonar');

    console.log('📥 Raw Perplexity response:', content.substring(0, 200));

    let personas;
    try {
      personas = JSON.parse(content);
    } catch (e1) {
      try {
        const arrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (arrayMatch) {
          personas = JSON.parse(arrayMatch[0]);
        } else {
          throw new Error('Could not find valid JSON in response');
        }
      } catch (e2) {
        console.error('❌ Failed to parse personas:', content);
        throw new Error('Failed to parse personas from AI response');
      }
    }

    if (!Array.isArray(personas) || personas.length === 0) {
      throw new Error('Invalid personas format - expected non-empty array');
    }

    personas.forEach((p, i) => {
      if (
        !p.name ||
        !p.age ||
        !p.bio ||
        !Array.isArray(p.goals) ||
        !Array.isArray(p.painPoints)
      ) {
        throw new Error(`Persona ${i + 1} missing required fields`);
      }
    });

    const savedPersonas = [];
    for (let i = 0; i < Math.min(personas.length, 4); i++) {
      const personaData = personas[i];
      const persona = new Persona({
        name: personaData.name,
        age: personaData.age,
        bio: personaData.bio,
        goals: personaData.goals,
        painPoints: personaData.painPoints,
        industry,
        userId: req.userId,
        isPremium: i > 0,
        avatar: '👤',
      });
      await persona.save();
      savedPersonas.push(persona);
    }

    console.log(`✅ Generated ${savedPersonas.length} personas for ${industry}`);
    res.json(savedPersonas);
  } catch (err) {
    console.error('❌ Persona generation error:', err.message);
    res.status(500).json({
      error: 'Failed to generate personas',
      details: err.message,
    });
  }
});

app.get('/api/personas', authenticateToken, async (req, res) => {
  try {
    const personas = await Persona.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(personas);
  } catch (err) {
    console.error('❌ Error fetching personas:', err);
    res.status(500).json({ error: 'Failed to fetch personas' });
  }
});

// --- PROMPTS (WITH PERPLEXITY) ---
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

    const systemPrompt =
      'You are a content strategist. You MUST respond with ONLY valid JSON - no markdown, no explanations, no code blocks. Just pure JSON array.';

    const userPrompt = `Based on this customer persona:
Name: ${persona.name}
Bio: ${persona.bio}
Goals: ${persona.goals.join(', ')}
Pain Points: ${persona.painPoints.join(', ')}

Generate exactly 5 content prompts. Return ONLY a JSON array (no markdown, no code blocks) with this structure:

[
  {
    "title": "Short actionable title (max 8 words)",
    "description": "One clear sentence",
    "category": "SEO"
  }
]

Category must be one of: SEO, Social, Blog, Website, Email`;

    console.log('🔄 Generating prompts for persona:', persona.name);

    const content = await callPerplexity(systemPrompt, userPrompt, 'sonar');

    console.log('📥 Raw response:', content.substring(0, 200));

    let prompts;
    try {
      prompts = JSON.parse(content);
    } catch (e1) {
      try {
        const arrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (arrayMatch) {
          prompts = JSON.parse(arrayMatch[0]);
        } else {
          throw new Error('Could not find valid JSON');
        }
      } catch (e2) {
        console.error('❌ Failed to parse prompts:', content);
        throw new Error('Failed to parse prompts from AI response');
      }
    }

    if (!Array.isArray(prompts) || prompts.length === 0) {
      throw new Error('Invalid prompts format');
    }

    const savedPrompts = [];
    for (const promptData of prompts) {
      const newPrompt = new Prompt({
        title: promptData.title,
        description: promptData.description,
        category: promptData.category,
        personaId,
        userId: req.userId,
      });
      await newPrompt.save();
      savedPrompts.push(newPrompt);
    }

    console.log(`✅ Generated ${savedPrompts.length} prompts for ${persona.name}`);
    res.json(savedPrompts);
  } catch (err) {
    console.error('❌ Prompt generation error:', err.message);
    res.status(500).json({
      error: 'Failed to generate prompts',
      details: err.message,
    });
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
    console.error('❌ Error fetching prompts:', err);
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

// --- CONTENT GENERATION (WITH PERPLEXITY) ---
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

    const user = await User.findById(req.userId);
    const contentCount = await Content.countDocuments({ userId: req.userId });
    if (user.plan === 'starter' && contentCount >= 50) {
      return res
        .status(403)
        .json({
          error:
            'Starter plan allows up to 50 content items. Upgrade to Pro for unlimited content.',
        });
    }

    const persona = prompt.personaId;

    const systemPrompt =
      'You are a professional copywriter. Write compelling, conversion-focused content.';

    const userPrompt = `Write ${type || 'website'} content for:

Prompt: ${prompt.title}
Description: ${prompt.description}
Category: ${prompt.category}

Target Persona:
- Name: ${persona.name}
- Goals: ${persona.goals.join(', ')}
- Pain Points: ${persona.painPoints.join(', ')}

Act as the best content writer and write 1300-1500 words of compelling copy that:
1. Addresses their pain points
2. Helps achieve their goals
3. Is conversion-focused and engaging
4. Uses clear, benefit-driven language

Return ONLY the content text (no JSON, no markdown formatting).`;

    console.log('🔄 Generating content for prompt:', prompt.title);

    const body = await callPerplexity(systemPrompt, userPrompt);

    const content = new Content({
      title: prompt.title,
      body,
      type: type || 'website',
      promptId,
      personaId: persona._id,
      userId: req.userId,
    });
    await content.save();

    console.log('✅ Content generated for:', prompt.title);
    res.json(content);
  } catch (err) {
    console.error('❌ Content generation error:', err);
    res.status(500).json({
      error: 'Failed to generate content',
      details: err.message,
    });
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
    console.error('❌ Error fetching content:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});
