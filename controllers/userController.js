const User = require('../models/User');

// import User model
const { User } = require('../models')

module.exports = {
    // GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}