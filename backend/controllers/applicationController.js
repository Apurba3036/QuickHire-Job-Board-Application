const Application = require('../models/Application');
const User = require('../models/User');
const { getIO } = require('../utils/socketLogic');

// Submit job application
exports.applyJob = async (req, res) => {
    try {
        const { job_id, name, email, resume_link, cover_note, user_id } = req.body;

        // Basic Validation
        if (!job_id || !name || !email || !resume_link) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let finalUserId = user_id;
        
        // If user_id is null, try to find user by email
        if (!finalUserId) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                finalUserId = existingUser._id;
            }
        }

        const newApplication = new Application({
            job_id,
            user_id: finalUserId,
            name,
            email,
            resume_link,
            cover_note
        });

        const savedApplication = await newApplication.save();

        // Emit notification to admins (or broadcast for now)
        try {
            const io = getIO();
            io.emit('notification', {
                type: 'NEW_APPLICATION',
                message: `New application received for job from ${name}`,
                data: savedApplication
            });
        } catch (err) {
            console.error("Socket emit failed", err.message);
        }

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

// Get applications for a user
exports.getUserApplications = async (req, res) => {
    try {
        console.log("Fetching applications for user ID:", req.user.id);
        
        const user = await User.findById(req.user.id);
        if (!user) {
            console.error("User not found in DB for ID:", req.user.id);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Found user email:", user.email);

        // Find by user_id OR email to capture historical guest applications
        const applications = await Application.find({
            $or: [
                { user_id: user._id },
                { email: user.email }
            ]
        })
        .populate('job_id')
        .sort({ createdAt: -1 });
        
        console.log(`Found ${applications.length} applications for user ${user.email}`);
        res.status(200).json(applications);
    } catch (err) {
        console.error("Error in getUserApplications:", err);
        res.status(500).json({ message: err.message });
    }
};
