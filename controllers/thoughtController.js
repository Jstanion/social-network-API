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
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!singleThought) {
                return res.status(404).json({ message: 'Item not found!' });
            }
            
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            
            // example data
            // {
            // "thoughtText": "Here's a cool thought...",
            // "username": "yourName",
            // "userId": "5edff358a0fcb779aa7b118b"
            // }

            res.json(newUser);
        } catch {
            res.status(500).json(err);
        }
    },
}