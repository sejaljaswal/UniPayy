const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');

router.get('/', userController.getUsers);

// New route to get current user's data - must come before /:id
router.get('/me', auth, userController.getUser);

router.get('/:id', userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

// Profile picture upload route with error handling
router.post('/profile-picture', auth, (req, res, next) => {
  userController.upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ error: 'Unexpected file field.' });
        }
      }
      if (err.message === 'Only image files are allowed!') {
        return res.status(400).json({ error: 'Only image files are allowed!' });
      }
      return res.status(400).json({ error: err.message || 'File upload error' });
    }
    // If no error, proceed to the controller
    userController.uploadProfilePicture(req, res);
  });
});

module.exports = router; 