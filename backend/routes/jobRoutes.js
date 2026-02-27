const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, createJob);
router.delete('/:id', authMiddleware, adminMiddleware, deleteJob);

module.exports = router;
