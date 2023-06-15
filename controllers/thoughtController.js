const { Thought, User } = require('../models/Thought');

module.exports = {
    // retrieve all thoughts
    async getAllThoughts(reg, res) {
        try {
            // the sort method will take retrieved data and place it in descending order
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // retrieve a single thought by it's ID
    async getThoughtById(req, res) {
        try {
            const singleThought = await Thought.findById({ _id: req.params.thoughtId })

            if (!singleThought) {
                return res.status(404).json({ message: 'Item not found!' });
            }
            
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {

            // example data
            // {
            // "thoughtText": "Here's a cool thought...",
            // "username": "yourName",
            // "userId": "5edff358a0fcb779aa7b118b"
            // }

            const { thoughtText, username, userId } = req.body;
            const newThought = await Thought.create({ thoughtText, username });

            // add thought _id to the associated user's thought array field
            const user = await User.findByIdAndUpdate(
                userId, 
                { $push: { thoughts: newThought._id } }, 
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(newThought);
        } catch {
            res.status(500).json(err);
        }
    },
}