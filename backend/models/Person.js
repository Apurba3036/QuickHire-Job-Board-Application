const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    profilePic: { type: String, required: true },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', personSchema);
