const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.post('/', auth, gameController.createGame);
router.get('/', gameController.getGames);
router.get('/:id', gameController.getGameById);
router.put('/:id', auth, gameController.updateGame);
router.delete('/:id', auth, gameController.deleteGame);

module.exports = router; 