require('dotenv').config();
const mongoose = require('mongoose');
const Club = require('../models/Club');

const clubs = [
  { name: 'Volleyball', icon: '🏐', members: [], chat: [] },
  { name: 'Football', icon: '⚽', members: [], chat: [] },
  { name: 'Cricket', icon: '🏏', members: [], chat: [] },
  { name: 'Basketball', icon: '🏀', members: [], chat: [] },
  { name: 'Table Tennis', icon: '🏓', members: [], chat: [] },
  { name: 'Badminton', icon: '🏸', members: [], chat: [] },
  { name: 'Chess', icon: '♟️', members: [], chat: [] },
  { name: 'Pool / Billiards', icon: '🎱', members: [], chat: [] },
  { name: 'Yoga Sessions', icon: '🧘', members: [], chat: [] },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Club.deleteMany({});
    await Club.insertMany(clubs);
    console.log('Clubs seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed(); 