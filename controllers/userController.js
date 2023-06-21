// Import the User model from the ../models/User.js file
const User = require('../models/User.js');

module.exports = {
    // GET all users
    async getAllUsers(req, res) {
        try {
            // Find all users and populate the 'thoughts' and 'friends' fields
            const users = await User.find()
            .populate('thoughts')
            .populate('friends')
            .select('-__v')

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a user by their ID
    async getUserById(req, res) {
        try {
            // Find a user by their ID and populate the 'thoughts' and 'friends' fields
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // CREATE a new user
    async createUser(req, res) {
        try {
            // Create a new user using the data from the request body
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
    // UPDATE a user by their ID
    async updateUser(req, res) {
        try {
            // Find a user by their ID and update their data with the content of the request body
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
    // DELETE a user by their ID
    async deleteUser(req, res) {
        try {
            // Find a user by their ID and remove them
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId });

            if (!deleteUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json({ message: "User successfully deleted" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // ADD a friend to a user
    async addFriend(req, res) {
        try {
            // Get the friend ID from the request parameters
            const friendId = req.params.friendId;

            // Find a user by their ID and add the friend ID to their 'friends' array
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
    // REMOVE a friend from a user
    async removeFriend(req, res) {
        try {
            // Get the friend ID from the request parameters
            const friendId = req.params.friendId;

            // Find a user by their ID and remove the friend ID from their 'friends' array
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