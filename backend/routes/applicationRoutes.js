const express = require('express');
const router = express.Router();
const { applyJob, getApplicationsByJob, getUserApplications } = require('../controllers/applicationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Anyone can apply (guest or registered)
router.post('/', applyJob);

// Logged in user can view their own applications
router.get('/user', authMiddleware, getUserApplications);

// Admin only can view applications by job
router.get('/job/:jobId', authMiddleware, adminMiddleware, getApplicationsByJob);

module.exports = router;
