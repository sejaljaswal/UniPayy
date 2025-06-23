require('dotenv').config();
const mongoose = require('mongoose');
const Club = require('../models/Club');

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const clubs = await Club.find({});
    console.log('Clubs:', clubs);
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

test(); 