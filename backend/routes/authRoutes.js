const express = require('express');
const router = express.Router();
const { syncUser, logout, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/sync', syncUser);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

module.exports = router;
