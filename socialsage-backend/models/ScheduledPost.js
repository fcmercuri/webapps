const mongoose = require('mongoose');
const ScheduledPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  content: { type: String, required: true },
  scheduledFor: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'posted', 'failed'], default: 'pending' },
  platform: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ScheduledPost', ScheduledPostSchema);
