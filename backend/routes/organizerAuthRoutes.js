const express = require('express');
const router = express.Router();
const organizerAuthController = require('../controllers/organizerAuthController');
const organizerAuth = require('../middleware/organizerAuth');

router.post('/signup', organizerAuthController.signup);
router.post('/login', organizerAuthController.login);
router.get('/me', organizerAuth, organizerAuthController.getMe);

module.exports = router; 