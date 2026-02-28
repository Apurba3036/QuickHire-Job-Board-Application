const express = require('express');
const router = express.Router();
const HiringSite = require('../models/HiringSite');

router.get('/', async (req, res) => {
    try {
        const sites = await HiringSite.find().sort({ createdAt: -1 });
        res.json(sites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
