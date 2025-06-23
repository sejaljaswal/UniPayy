const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');

router.get('/', leaderboardController.getLeaderboard);
router.put('/:userId', auth, leaderboardController.updateLeaderboard);

module.exports = router; 