const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const combinedAuth = require('../middleware/combinedAuth');
const organizerAuth = require('../middleware/organizerAuth');

// Get all clubs (with optional search)
router.get('/clubs', combinedAuth, clubController.getClubs);

// Get club by ID
router.get('/clubs/:clubId', organizerAuth, clubController.getClubById);

// Join a club
router.post('/clubs/join', combinedAuth, clubController.joinClub);

// Exit a club
router.post('/clubs/exit', combinedAuth, clubController.exitClub);

// Get chat history for a club
router.get('/clubs/:clubId/chat', combinedAuth, clubController.getClubChat);

module.exports = router; 