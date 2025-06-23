const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  schedule: { type: Date, required: true },
  venue: { type: String },
  maxPlayers: { type: Number, required: true },
  currentPlayers: { type: Number, default: 0 },
  registeredPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema); 