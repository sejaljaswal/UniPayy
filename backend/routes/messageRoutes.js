const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', auth, messageController.createMessage);
router.get('/:gameId', messageController.getMessagesByGame);

module.exports = router; 