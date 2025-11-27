const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', topicSchema);
