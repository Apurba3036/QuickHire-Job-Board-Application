const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
