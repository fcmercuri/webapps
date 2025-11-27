const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // "SEO", "Social", "Blog", etc.
  personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', promptSchema);