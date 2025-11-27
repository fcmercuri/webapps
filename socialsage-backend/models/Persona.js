const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  bio: { type: String },
  goals: { type: [String] },
  painPoints: { type: [String] },
  avatar: { type: String }, // URL or emoji
  industry: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  isPremium: { type: Boolean, default: false }, // NEW: Lock premium personas
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Persona', personaSchema);
