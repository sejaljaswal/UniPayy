const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wins: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema); 