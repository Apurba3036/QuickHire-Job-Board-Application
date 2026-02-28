const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.get('/', async (req, res) => {
    try {
        const people = await Person.find().sort({ createdAt: -1 });
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
