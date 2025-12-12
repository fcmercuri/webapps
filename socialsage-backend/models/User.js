const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  // Password only required for non‑Google users
  password: {
    type: String,
    required: function () {
      return !this.googleId; // if no googleId, we expect a password
    },
  },

  googleId: {
    type: String,
  },

  industry: String,
  isPremium: { type: Boolean, default: false },
  plan: {
    type: String,
    enum: ['free', 'starter', 'pro'],
    default: 'free',
  },

  // Stripe billing fields
  stripeSubscriptionId: { type: String },   // ← add this
  stripeCustomerId: { type: String },       // ← and this

  // password reset fields
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = mongoose.model('User', userSchema);
