const User = require('../models/User');

module.exports = {

    // GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            // .populate('thoughts')
            // .populate('friends')
            // .select('-__v')

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            // .populate('thoughts')
            // .populate('friends')
            // .select('-__v')
            
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            
            // example data
            // {
            //   "username": "yourName",
            //   "email": "yourEmail@gmail.com"
            // }

            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updateUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json(updateUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId });

            if (!deleteUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json({ message: "User successfully deleted" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend(req, res) {
        try {
            const friendId = req.params.friendId;
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friendId } },
                { runValidators: true, new: true }
            );

            if (!addFriend) {
                return res.status(404).json({ message: "User not found!" })
            }

            res.json(addFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // remove a friend
    async removeFriend(req, res) {
        try {
            const friendId = req.params.friendId
            const removeFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friendId } },
                { runValidators: true, new: true}
            )

            if (!removeFriend) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json(removeFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};