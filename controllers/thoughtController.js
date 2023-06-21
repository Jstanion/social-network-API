const { add } = require('../models/Reaction.js');
const Thought = require('../models/Thought.js');
const User = require('../models/User.js');

module.exports = {
    // retrieve all thoughts
    async getAllThoughts(req, res) {
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
            const newThought = await Thought.create(req.body);

            // example data
            // {
            // "thoughtText": "Here's a cool thought...",
            // "username": "yourName",
            // "userId": "5edff358a0fcb779aa7b118b"
            // }
                
            // add thought _id to the associated user's thought array field
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId }, 
                { $addToSet: { thoughts: newThought._id } }, 
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but no user was found' });
            }

            res.json("Thought succesfully created!");
        } catch (err) {
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

            // Example data
            //{
            //  "reactionBody": "👍"
            //  "username": "yourUsername"
            //}

            const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            console.log(addReaction)

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
            const { reactionId } = req.params;
            const { thoughtId } = req.params;

            const removeReaction = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { _id: reactionId } } },
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