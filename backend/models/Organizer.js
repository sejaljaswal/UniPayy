const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'organizer' },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
  invitationCode: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Organizer', organizerSchema); 