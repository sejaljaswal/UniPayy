const express = require('express');
const router = express.Router();
const organizerEventController = require('../controllers/organizerEventController');
const organizerAuth = require('../middleware/organizerAuth');
const auth = require('../middleware/auth');

// Public route to get all events (for dashboard)
router.get('/public', organizerEventController.getPublicEvents);

// User enrollment routes (require user authentication)
router.post('/:eventId/enroll', auth, organizerEventController.enrollInEvent);
router.delete('/:eventId/enroll', auth, organizerEventController.unenrollFromEvent);

// Protected routes (require organizer authentication)
router.use(organizerAuth);
router.get('/', organizerEventController.getEvents);
router.post('/', organizerEventController.createEvent);
router.get('/:id', organizerEventController.getEventById);
router.put('/:id', organizerEventController.updateEvent);
router.delete('/:id', organizerEventController.deleteEvent);
router.get('/:id/participants', organizerEventController.getParticipants);

module.exports = router; 