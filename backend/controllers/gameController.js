const Game = require('../models/Game');

exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create game' });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().populate('registeredPlayers', 'name avatar');
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('registeredPlayers', 'name avatar');
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    // TODO: Add authorization check
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update game' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    // TODO: Add authorization check
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete game' });
  }
}; 