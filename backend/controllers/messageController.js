const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const { gameId, message } = req.body;
    const userId = req.user.id;
    const newMsg = await Message.create({ game: gameId, user: userId, message });
    await newMsg.populate('user', 'name avatar');
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(400).json({ error: 'Failed to send message' });
  }
};

exports.getMessagesByGame = async (req, res) => {
  try {
    const messages = await Message.find({ game: req.params.gameId })
      .populate('user', 'name avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}; 