const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'name avatar')
      .sort({ score: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

exports.updateLeaderboard = async (req, res) => {
  try {
    // TODO: Add authorization check
    const { userId } = req.params;
    const { score, wins, rank } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { user: userId },
      { $set: { score, wins, rank } },
      { new: true, upsert: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update leaderboard' });
  }
}; 