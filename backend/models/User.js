const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Made optional for Google OAuth
  studentId: { type: String, required: true },
  points: { type: Number, default: 0 },
  avatar: { type: String },
  googleId: { type: String }, // For Google OAuth
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 