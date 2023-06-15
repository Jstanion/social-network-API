const Thought = require('../models/Thought');

module.exports = {
    // retrieve all thoughts
    async getAllThoughts(reg, res) {
        try {
            const thoughts = await Thought.find();
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
                return res.status(404).json({ message: 'User not found!' });
            }
            
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}