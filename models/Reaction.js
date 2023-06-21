// Import the Schema and model objects from the mongoose library
const { Schema, Types } = require('mongoose');
// Define the reaction schema using Mongoose Schema class
const reactionSchema = new Schema(
    {
        // Define the reactionId field with type ObjectId and a default value is generated using Types.ObjectId()
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // Define the reactionBody field with type String. It is required and has a maximum length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        // Define the username field with type String. It is required to specify the username of the reaction creator
        username: {
            type: String,
            required: true,
        },
        // Define the createdAt field with type Date and a default value of the current date and time
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // Configure the toJSON option for the schema which enables virtual getters to be included when converting the schema to JSON
        toJSON: {
            getters: true,
        },
        // Disable the generation of the 'id' virtual field for the schema
        id: false,
    }
);

// Export the reaction schema
module.exports = reactionSchema;