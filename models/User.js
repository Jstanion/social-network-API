// import Schema and model objects from the mongoose library
const { Schema, model, Types } = require('mongoose');

// Schema to create a User model defining the fields and properties for a user document in MongoDB
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,

            // regex pattern to validate the correct format for an email address, or returns a message if invalid
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', 
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//  virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// User model is defined so it can be exported and used in other files
const User = model('user', userSchema);

module.exports = User;