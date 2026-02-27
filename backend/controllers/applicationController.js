const Application = require('../models/Application');

// Submit job application
exports.applyJob = async (req, res) => {
    try {
        const { job_id, name, email, resume_link, cover_note, user_id } = req.body;

        // Basic Validation
        if (!job_id || !name || !email || !resume_link) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newApplication = new Application({
            job_id,
            user_id, // could be null if guest applying
            name,
            email,
            resume_link,
            cover_note
        });

        const savedApplication = await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully", application: savedApplication });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get applications for a job (Admin)
exports.getApplicationsByJob = async (req, res) => {
    try {
        const applications = await Application.find({ job_id: req.params.jobId }).populate('user_id', 'name email');
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
