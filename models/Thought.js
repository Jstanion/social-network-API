const { Schema, model } = require('mongoose');
// Import the reactionSchema for the reactions field in the thoughtSchema
const reactions = require('./Reaction');

// Creates a thought Schema defining the fields and properties for a thoughts document in the MongoDB collection
const thoughtSchema = new Schema(
    {
        // Define the thoughtText field with type String. It is required and has a minimum length of 1 and maximum length of 280 characters
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // Define the createdAt field with type Date and a default value of the current date and time
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Define the username field with type String. It is required to specify the username of the thought creator
        username: {
            type: String,
            required: true,
        },
        // Define the reactions field as an array of reactionSchema
        reactions: [reactions],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Define a virtual property 'reactionCount' for thoughtSchema which retrieves the length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

// Define a model 'Thought' using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;