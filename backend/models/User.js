const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: { type: String, required: true },
  points: { type: Number, default: 0 },
  avatar: { type: String },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 