const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.syncUser = async (req, res) => {
    try {
        const { uid, email, name, profilePic } = req.body;

        if (!uid || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // All new signups are always 'user' role.
            // Admin roles must be assigned manually in the database.
            user = new User({
                uid,
                email,
                name: name || email.split('@')[0],
                profilePic,
                role: 'user'
            });
            await user.save();
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
        });

        res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-uid');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
