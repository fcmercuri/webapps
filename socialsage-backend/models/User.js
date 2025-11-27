const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  industry: String,
  isPremium: { type: Boolean, default: false },
  plan: {
    type: String,
    enum: ['free', 'starter', 'pro'],
    default: 'free',
  },
});

module.exports = mongoose.model('User', userSchema);
