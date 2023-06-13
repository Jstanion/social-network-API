// import Schema and Types objects from the mongoose library
const { Schema, Types } = require('mongoose');

// Creates a Schema for Thoughts defining the fields and properties for a thoughts document in the MongoDB collection
const thoughtSchema = new Schema(
    {
        // represents the unique identifier for each thought
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            min_length: 1,
            max_length: 150,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// thoughtSchema is exported and used in other areas of the application
module.exports = thoughtSchema;