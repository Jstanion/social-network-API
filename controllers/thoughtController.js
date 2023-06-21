// Import the 'add' function from the ../models/Reaction.js file
const { add } = require('../models/Reaction.js');
// Import the Thought model from the ../models/Thought.js file
const Thought = require('../models/Thought.js');
// Import the User model from the ../models/User.js file
const User = require('../models/User.js');

module.exports = {
    // Retrieve all thoughts
    async getAllThoughts(req, res) {
        try {
            // Find all thoughts and sort them in descending order based on 'createdAt' field
            const thoughts = await Thought.find().sort({ createdAt: -1 });

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Retrieve a single thought by its ID
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
    // Create a new thought
    async createThought(req, res) {
        try {
            // Create a new thought using the data from the request body
            const newThought = await Thought.create(req.body);
                // example data
                // {
                // "thoughtText": "Here's a cool thought...",
                // "username": "yourName",
                // "userId": "5edff358a0fcb779aa7b118b"
                // }
                
            // Add the thought's _id to the associated user's 'thoughts' array field
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
    // Update a thought
    async updateThought(req, res) {
        try {
            // Find a thought by its ID and update its data with the content of the request body
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
    // Delete a thought
    async deleteThought(req, res) {
        try {
            // Find a thought by its ID and remove it
            const deletedThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: "Item not found!" });
            }

            // Remove the thought's _id from the associated user's 'thoughts' array field
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
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            // Example data
            //{
            //  "reactionBody": "👍"
            //  "username": "yourUsername"
            //}

            // Find the thought by its ID and add the specified reaction to the reactions array
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
    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            // Get the reactionId and thoughtId from the request parameters
            const { reactionId } = req.params;
            const { thoughtId } = req.params;
            
            // Find the thought by its ID and remove the specified reaction from the reactions array
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