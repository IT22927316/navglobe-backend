const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getCurrentUser,
  getFavoriteCountries,
  toggleFavoriteCountry,
} = require('../controllers/userController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected User Routes
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.get('/me', protect, getCurrentUser);

router.put('/favorites/:code', protect, (req, res) => toggleFavoriteCountry(req, res));
router.get('/favorites', protect, (req, res) => getFavoriteCountries(req, res));

// Admin Routes
router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.put('/:id', protect, adminOnly, updateUserById);
router.delete('/:id', protect, adminOnly, deleteUserById);

module.exports = router;
