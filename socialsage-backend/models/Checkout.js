const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

require('dotenv').config({ path: './mongo.env' }); // Load secrets from mongo.env

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use secret key from env

// Create Stripe Checkout Session
router.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', // use 'payment' for one-time
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      // Redirect to your dashboard after success
      success_url: 'https://sainthetic.com/dashboard?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://sainthetic.com/upgrade',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({
