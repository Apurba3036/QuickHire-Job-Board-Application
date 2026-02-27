const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume_link: { type: String, required: true },
    cover_note: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
