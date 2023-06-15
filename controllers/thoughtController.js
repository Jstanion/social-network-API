const { Thought, User } = require('../models');

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
  
}