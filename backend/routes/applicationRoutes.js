const express = require('express');
const router = express.Router();
const { applyJob, getApplicationsByJob } = require('../controllers/applicationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Anyone can apply (guest or registered)
router.post('/', applyJob);

// Admin only can view applications
router.get('/job/:jobId', authMiddleware, adminMiddleware, getApplicationsByJob);

module.exports = router;
