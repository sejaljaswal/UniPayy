const OrganizerEvent = require('../models/OrganizerEvent');

exports.createEvent = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body);
    console.log('Organizer ID:', req.organizer.id);
    
    // Parse the date string into a Date object
    const eventData = {
      ...req.body,
      organizer: req.organizer.id,
      date: new Date(req.body.date)
    };
    
    console.log('Processed event data:', eventData);
    const event = await OrganizerEvent.create(eventData);
    console.log('Event created successfully:', event);
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ error: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await OrganizerEvent.find({ organizer: req.organizer.id })
      .populate('organizer', 'name email')
      .populate('participants', 'name email studentId avatar')
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.getPublicEvents = async (req, res) => {
  try {
    console.log('Getting public events for dashboard');
    const events = await OrganizerEvent.find({ date: { $gte: new Date() } })
      .populate('organizer', 'name email')
      .populate('participants', 'name email studentId avatar')
      .sort({ date: 1 })
      .limit(10);
    console.log('Found public events:', events.length);
    res.json(events);
  } catch (err) {
    console.error('Error fetching public events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await OrganizerEvent.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('participants', 'name email studentId avatar');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    if (req.body.date) {
      eventData.date = new Date(req.body.date);
    }
    
    const event = await OrganizerEvent.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true }
    ).populate('organizer', 'name email')
     .populate('participants', 'name email studentId avatar');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await OrganizerEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const event = await OrganizerEvent.findById(req.params.id)
      .populate('participants', 'name email studentId avatar');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event.participants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
};

// New methods for enrollment
exports.enrollInEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    
    console.log('Enrolling user in event:', { eventId, userId });
    
    const event = await OrganizerEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is already enrolled
    if (event.participants.includes(userId)) {
      return res.status(400).json({ error: 'Already enrolled in this event' });
    }
    
    // Add user to participants
    event.participants.push(userId);
    await event.save();
    
    // Populate and return updated event
    const updatedEvent = await OrganizerEvent.findById(eventId)
      .populate('organizer', 'name email')
      .populate('participants', 'name email studentId avatar');
    
    console.log('User enrolled successfully');
    res.json(updatedEvent);
  } catch (err) {
    console.error('Error enrolling in event:', err);
    res.status(500).json({ error: 'Failed to enroll in event' });
  }
};

exports.unenrollFromEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    
    console.log('Unenrolling user from event:', { eventId, userId });
    
    const event = await OrganizerEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is enrolled
    if (!event.participants.includes(userId)) {
      return res.status(400).json({ error: 'Not enrolled in this event' });
    }
    
    // Remove user from participants
    event.participants = event.participants.filter(id => id.toString() !== userId);
    await event.save();
    
    // Populate and return updated event
    const updatedEvent = await OrganizerEvent.findById(eventId)
      .populate('organizer', 'name email')
      .populate('participants', 'name email studentId avatar');
    
    console.log('User unenrolled successfully');
    res.json(updatedEvent);
  } catch (err) {
    console.error('Error unenrolling from event:', err);
    res.status(500).json({ error: 'Failed to unenroll from event' });
  }
}; 