// import Schema and Types objects from the mongoose library
const { Schema, model } = require('mongoose');
const reactions = require('./Reaction');

// Creates a thought Schema defining the fields and properties for a thoughts document in the MongoDB collection
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
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

// virtual property that retrieves the length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

// thoughtSchema is defiend as a model and exported
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;