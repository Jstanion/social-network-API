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
            const user = await User.findOneAndUpdate(
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
    // update a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "Item not found!" });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a thought
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: "Item not found!" });
            }

            // remove the thought _id from associated user's thought array field
            await User.findOneAndUpdate(
                deletedThought.userId, 
                { $pull: { thoughts: req.params.thoughtId } }, 
                { new: true }
            ); 

            res.json({ message: "Thought successfully deleted" });
        } catch (err) {
            res.status(500).json(err)
        };
    },
    // add reaction to a thought
    async addReaction(req, res) {
        try {
            const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!addReaction) {
                return res.status(404).json({ message: "Item not found!" });
            }

            res.json(addReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const removeReaction = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { reactions: req.body } },
                { new: true }
            );

            if (!removeReaction) {
                return res.status(404).json({ message: "Item not found!" });
            }

            res.json(removeReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};