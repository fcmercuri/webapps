// models/persona.js
const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  bio: { type: String },
  goals: { type: [String] },
  painPoints: { type: [String] },
  avatar: { type: String }, // URL or emoji
  industry: { type: String },
  websiteUrl: { type: String },
  role: { type: String },
  buyingStage: { type: String, enum: ['cold', 'warm', 'hot'] },
  fitScore: Number, urgencyScore: Number, authorityScore: Number, triggerScore: Number,
  fitEvidence: String, urgencyEvidence: String, authorityEvidence: String, triggerEvidence: String,
  buyingTriggers: [String], objections: [String], preferredChannels: [String], messagingAngle: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isPremium: { type: Boolean, default: false },
  // NEW: lead score 0–100
  conversionScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Persona', personaSchema);
