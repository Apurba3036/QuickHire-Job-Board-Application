const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
