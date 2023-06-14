const User = require('../models/User');

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
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
            
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async 
}