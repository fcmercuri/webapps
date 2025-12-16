require('dotenv').config({ path: 'mongo.env' });
console.log('STRIPE_SECRET_KEY present?', !!process.env.STRIPE_SECRET_KEY);

const crypto = require('crypto');
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

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://socialsageback.onrender.com',
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
        ? 'https://socialsageback.onrender.com'
        : 'http://localhost:3000';

    const params = {
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res
      .status(err.statusCode || 500)
      .json({ error: err.message });
  }
});

// >>> GOOGLE LOGIN ROUTE <<<
app.post('/api/auth/google-login', async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(400).json({ error: 'Missing access_token' });
    }

    const googleRes = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const profile = googleRes.data;

    if (!profile.email) {
      return res.status(400).json({ error: 'Google account has no email' });
    }

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        email: profile.email,
        name: profile.name || 'Google User',
        avatar: profile.picture,
        authProvider: 'google',
        googleId: profile.sub,
        plan: 'free',
        isPremium: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        industry: user.industry,
        isPremium: user.isPremium,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error('❌ Google login error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Google login failed' });
  }
});

// --- STRIPE VERIFY SESSION ROUTE ---
app.post('/api/stripe/verify-session', async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    });

    if (session.payment_status !== 'paid') {
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

    user.stripeSubscriptionId = session.subscription;
    user.stripeCustomerId =
      typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id;

    console.log('Stripe ids to save:', {
      email: user.email,
      subscription: user.stripeSubscriptionId,
      customer: user.stripeCustomerId,
    });

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

// --- SIMPLE LEAD SCORING HELPER ---
function calculateConversionScore(persona, industry) {
  let score = 0;

  const hotIndustries = [
    'saas',
    'software',
    'tech',
    'marketing',
    'ecommerce',
    'fitness',
    'finance',
    'healthcare',
  ];
  const hotRolesHigh = ['founder', 'owner', 'ceo', 'cmo', 'cto'];
  const hotRolesMid = ['director', 'vp', 'head', 'manager', 'lead'];

  const role = (persona.role || '').toLowerCase();
  const ind = (industry || persona.industry || '').toLowerCase();

  if (hotIndustries.some((i) => ind.includes(i))) score += 20;
  if (hotRolesHigh.some((r) => role.includes(r))) score += 25;
  else if (hotRolesMid.some((r) => role.includes(r))) score += 15;
  else if (role) score += 5;

  const goalsCount = (persona.goals || []).length;
  const painsCount = (persona.painPoints || []).length;

  if (goalsCount >= 4) score += 18;
  else if (goalsCount >= 2) score += 10;
  else if (goalsCount >= 1) score += 4;

  if (painsCount >= 4) score += 18;
  else if (painsCount >= 2) score += 10;
  else if (painsCount >= 1) score += 4;

  if (typeof persona.age === 'number') {
    if (persona.age >= 28 && persona.age <= 50) score += 6;
    else if (persona.age >= 22 && persona.age < 28) score += 3;
  }

  const jitter = Math.floor(Math.random() * 7) - 3;
  score += jitter;

  if ((persona.goals && goalsCount) || (persona.painPoints && painsCount)) {
    score += 5;
  }

  const finalScore = Math.max(0, Math.min(score, 100));
  return Number.isFinite(finalScore) ? finalScore : 0;
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
  res.send('sAInthetic API is running with Perplexity AI');
});

// --- AUTH: REGISTER ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    console.log('✅ User registered:', email);

    // create email verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    user.emailVerifyToken = verifyToken;
    user.emailVerifyExpires = Date.now() + 1000 * 60 * 60 * 24; // 24h
    await user.save();

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://socialsageback.onrender.com'
        : 'http://localhost:3000';

    const verifyLink = `${baseUrl}/verify-email/${verifyToken}`;

    // send welcome + confirm email
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Welcome to sAInthetic – confirm your email',
        template: {
          id: process.env.RESEND_WELCOME_TEMPLATE_ID,
          variables: {
            userEmail: email,
            verifyLink,
            year: new Date().getFullYear(),
          },
        },
      });
      console.log('Sent welcome/verify email to', email, verifyLink);
    } catch (err) {
      console.error('Welcome email error:', err);
    }

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res
      .status(400)
      .json({ error: 'Registration failed', details: err.message });
  }
});

// --- AUTH: VERIFY EMAIL ---

app.get('/api/auth/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;
    console.log('🔐 Verify hit with token:', token);

    // 1) Try to find user with matching token and valid expiry
    let user = await User.findOne({
      emailVerifyToken: token,
      emailVerifyExpires: { $gt: Date.now() },
    });

    if (!user) {
      // 2) Maybe user is already verified and token cleared (link reused)
      const already = await User.findOne({
        emailVerified: true,
        emailVerifyToken: { $in: [null, undefined] },
      });

      if (already) {
        console.log('✅ Link reused, user already verified:', already.email);
        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? 'https://socialsageback.onrender.com'
            : 'http://localhost:3000';

        return res.redirect(`${baseUrl}/email-verified`);
      }

      console.log('❌ No user for verify token or token expired');
      return res.status(400).send('Verification link is invalid or expired.');
    }

    // 3) First-time valid verification
    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;
    await user.save();
    console.log('✅ Email verified for:', user.email);

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://socialsageback.onrender.com'
        : 'http://localhost:3000';

    return res.redirect(`${baseUrl}/email-verified`);
  } catch (err) {
    console.error('❌ Verify-email error:', err);
    res.status(500).send('Failed to verify email.');
  }
});


// --- AUTH: LOGIN ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (!user.emailVerified) {
      return res
        .status(403)
        .json({ error: 'Please confirm your email before logging in.' });
    }

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

// Get best-converting persona for current user
app.get('/api/personas/best', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const filter = { userId: req.userId };
    if (user.plan !== 'pro') {
      filter.isPremium = false;
    }

    const best = await Persona.findOne(filter)
      .sort({ conversionScore: -1 })
      .lean();

    if (!best) {
      return res.status(404).json({ error: 'No personas found' });
    }

    res.json(best);
  } catch (err) {
    console.error('❌ Error fetching best persona:', err);
    res.status(500).json({ error: 'Failed to fetch best persona' });
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

      const conversionScore = calculateConversionScore(personaData, industry);
      console.log('DEBUG persona score:', personaData.name, conversionScore);

      const persona = await Persona.create({
        name: personaData.name,
        age: personaData.age,
        bio: personaData.bio,
        goals: personaData.goals,
        painPoints: personaData.painPoints,
        industry,
        userId: req.userId,
        isPremium: i > 0,
        avatar: '👤',
        conversionScore,
      });

      savedPersonas.push(persona);
    }

    console.log(`✅ Generated ${savedPersonas.length} personas for ${industry}`);
    return res.json(savedPersonas);
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

// --- BEST-PERSONA PROMPTS (LLM ONLY, NOT STORED) ---
app.get('/api/prompts/best-persona', authenticateToken, async (req, res) => {
  try {
    const persona = await Persona.findOne({ userId: req.userId })
      .sort({ conversionScore: -1 });

    if (!persona) {
      return res.status(404).json({ error: 'No personas found' });
    }

    const goals = Array.isArray(persona.goals)
      ? persona.goals.join(', ')
      : (persona.goals || '');
    const pains = Array.isArray(persona.painPoints)
      ? persona.painPoints.join(', ')
      : (persona.painPoints || '');

    const systemPrompt =
      'You are a senior performance marketer. Respond ONLY with a valid JSON array, no markdown, no explanations.';

    const userPrompt = `
You are designing research and copywriting prompts for an AI assistant.
The target customer persona has:
- Bio: ${persona.bio}
- Goals: ${goals}
- Pains: ${pains}

Generate 10 high‑intent QUESTIONS that a marketer, founder or copywriter
should ask an AI assistant in order to better understand, persuade, or convert
this persona. Do NOT mention the persona's name inside the questions.
Write each question as if you are talking about "this customer" or "this person",
not by name.

For each item, return:
- "prompt": the full question to ask the AI (no persona name)
- "intent": "research" | "message" | "offer" | "objection" | "funnel"
- "channel": "llm-assistant"

Return JSON ONLY, for example:
[
  { "prompt": "What are the deepest fears this customer has about switching tools?", "intent": "research", "channel": "llm-assistant" }
]`;

    const raw = await callPerplexity(systemPrompt, userPrompt, 'sonar');

    let prompts;
    try {
      prompts = JSON.parse(raw);
    } catch (e1) {
      const arrayMatch = raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (!arrayMatch) {
        throw new Error('Failed to parse LLM response as JSON');
      }
      prompts = JSON.parse(arrayMatch[0]);
    }

    if (!Array.isArray(prompts) || prompts.length === 0) {
      return res.status(500).json({ error: 'LLM returned no prompts' });
    }

    return res.json({ persona, prompts });
  } catch (err) {
    console.error('❌ Best-persona prompts error:', err.message || err);
    return res.status(500).json({ error: 'Failed to generate prompts' });
  }
});

// --- EXTRACT FOCUS KEYWORD FOR PROMPTS ---
app.post('/api/prompts/volume', authenticateToken, async (req, res) => {
  try {
    const { prompts } = req.body;
    if (!Array.isArray(prompts) || prompts.length === 0) {
      return res.status(400).json({ error: 'prompts array is required' });
    }

    const STOPWORDS = new Set([
      'the','a','an','and','or','but','for','to','of','in','on','with','about',
      'how','what','why','when','where','who','is','are','do','does','can',
      'could','should','would','i','you','we','they','my','your','their','our',
      'this','that','these','those','into','from','at','as','by','be','been',
      'being','it','its','if','so'
    ]);

    const enriched = prompts.map((p) => {
      const text = (p.prompt || '').toLowerCase();

      const sentences = text
        .split(/[?.!]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
      const mainSentence = sentences[0] || text;

      const words = mainSentence
        .split(/[^a-z0-9+]+/)
        .filter(Boolean)
        .filter((w) => !STOPWORDS.has(w));

      let focusKeyword = '';
      if (words.length >= 3) {
        focusKeyword = `${words[0]} ${words[1]} ${words[2]}`;
      } else if (words.length === 2) {
        focusKeyword = `${words[0]} ${words[1]}`;
      } else if (words.length === 1) {
        focusKeyword = words[0];
      } else {
        focusKeyword = p.prompt || '';
      }

      return {
        ...p,
        focusKeyword,
      };
    });

    return res.json({ prompts: enriched });
  } catch (err) {
    console.error('❌ Prompt keyword error:', err.message || err);
    return res.status(500).json({ error: 'Failed to extract focus keywords' });
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

    if ((user.plan === 'free' || !user.plan) && contentCount >= 5) {
      return res.status(403).json({
        error:
          'Free plan allows up to 5 content items. Upgrade to Starter or Pro for more.',
      });
    }

    if (user.plan === 'starter' && contentCount >= 50) {
      return res.status(403).json({
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
- Bio: ${persona.bio}
- Goals: ${Array.isArray(persona.goals) ? persona.goals.join(', ') : persona.goals}
- Pain Points: ${
      Array.isArray(persona.painPoints)
        ? persona.painPoints.join(', ')
        : persona.painPoints
    }

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

// GET billing summary – REAL
app.get('/api/billing', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.stripeSubscriptionId) {
      return res.json({
        plan: user.plan || 'free',
        planLabel: (user.plan || 'free').toUpperCase(),
        status: user.plan === 'free' ? 'inactive' : 'active',
        renewsAt: null,
        cancelledAt: null,
      });
    }

    const sub = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

    res.json({
      plan: user.plan || 'free',
      planLabel: (user.plan || 'free').toUpperCase(),
      status: sub.cancel_at_period_end ? 'cancelled' : 'active',
      renewsAt: sub.current_period_end,
      cancelledAt: sub.cancel_at || null,
    });
  } catch (err) {
    console.error('❌ Billing load error:', err);
    res.status(500).json({ error: 'Failed to load billing info' });
  }
});

// POST cancel auto‑renew
app.post('/api/billing/cancel', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.stripeSubscriptionId) {
      return res
        .status(400)
        .json({ error: 'No active Stripe subscription linked to this user' });
    }

    const sub = await stripe.subscriptions.update(
      user.stripeSubscriptionId,
      { cancel_at_period_end: true }
    );

    res.json({ status: 'ok', subscription: sub.id });
  } catch (err) {
    console.error('❌ Cancel billing error:', err);
    res.status(500).json({ error: 'Failed to cancel renewal' });
  }
});

// POST /api/billing/portal
app.post('/api/billing/portal', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    console.log('Portal user check:', {
      userId: req.userId,
      hasUser: !!user,
      email: user?.email,
      stripeCustomerId: user?.stripeCustomerId,
    });

    if (!user || !user.stripeCustomerId) {
      return res
        .status(400)
        .json({ error: 'No Stripe customer linked to this user' });
    }

    const origin =
      process.env.NODE_ENV === 'production'
        ? 'https://socialsageback.onrender.com'
        : 'http://localhost:3000';

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${origin}/account`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe portal error:', err);
    return res
      .status(500)
      .json({ error: 'Failed to create billing portal session' });
  }
});

// Request password reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'If the account exists, an email was sent.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30;
    await user.save();

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://socialsageback.onrender.com'
        : 'http://localhost:3000';

    const resetLink = `${baseUrl}/reset-password/${token}`;

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Reset your sAInthetic password',
        template: {
          id: process.env.RESEND_RESET_TEMPLATE_ID,
          variables: {
            userEmail: email,
            resetLink,
            year: new Date().getFullYear(),
          },
        },
      });
      console.log('Sent reset email to', email, resetLink);
    } catch (err) {
      console.error('Email send error:', err);
    }

    res.json({ message: 'If the account exists, an email was sent.' });
  } catch (err) {
    console.error('❌ Forgot-password error:', err);
    res.status(500).json({ error: 'Failed to start reset' });
  }
});

// Complete password reset
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Reset link is invalid or expired' });
    }

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('❌ Reset-password error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
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
