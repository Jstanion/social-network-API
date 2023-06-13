// import Schema and Types objects from the mongoose library
const { Schema, Model, Types } = require('mongoose');

// Creates a thought Schema defining the fields and properties for a thoughts document in the MongoDB collection
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// thoughtSchema is exported and used in other areas of the application
module.exports = thoughtSchema;