const mongoose = require('mongoose');

const hiringSiteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HiringSite', hiringSiteSchema);
