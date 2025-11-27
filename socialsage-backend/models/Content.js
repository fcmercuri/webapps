const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String, required: true },
  type: { type: String }, // "website", "social", "blog"
  promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
  personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
