const Organizer = require('../models/Organizer');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, invitationCode } = req.body;

    // Check if invitation code is provided
    if (!invitationCode) {
      return res.status(400).json({ error: 'Invitation code is required' });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'A student account with this email already exists. Students cannot be organizers.' });
    }
    
    // Check if an organizer with this email already exists
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(400).json({ error: 'Email already in use by an organizer' });
    }

    // For now, let's use a simple master invitation code.
    // In a real application, you'd have a collection of single-use codes.
    if (invitationCode !== 'uniplay5555') {
      return res.status(400).json({ error: 'Invalid invitation code' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const organizer = await Organizer.create({
      name,
      email,
      password: hashed,
      phone,
      invitationCode // Storing it to ensure it's unique, though we are not managing multiple codes yet.
    });

    const token = jwt.sign({ id: organizer._id, role: organizer.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        phone: organizer.phone,
        role: organizer.role
      }
    });
  } catch (err) {
    if (err.code === 11000) { // Handle unique constraint violation for invitationCode
      return res.status(400).json({ error: 'This invitation code has already been used.' });
    }
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, organizer.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: organizer._id, role: organizer.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, organizer: { id: organizer._id, name: organizer.name, email: organizer.email, phone: organizer.phone, role: organizer.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.organizer.id).populate('clubs', 'name icon');
    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' });
    }
    res.json(organizer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch organizer' });
  }
}; 