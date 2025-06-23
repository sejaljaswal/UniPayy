const mongoose = require('mongoose');

const organizerEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  sportType: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('OrganizerEvent', organizerEventSchema); 