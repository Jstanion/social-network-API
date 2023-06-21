const { Schema, model } = require('mongoose');

// Schema to create a User model defining the fields and properties for a user document in MongoDB
const userSchema = new Schema(
    {
        // Define the username field with type String. It must be unique, required, and trimmed (leading and trailing whitespaces are removed)
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // Define the email field with type String which must be unique, required, and trimmed.
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            //The match property specifies a regular expression pattern to validate the email format
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.'],
        },
        // Define the thoughts field as an array of ObjectIds referencing the 'Thought' model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', 
            },
        ],
        // Define the friends field as an array of ObjectIds referencing the 'User' model
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

// Define a virtual property 'friendCount' for userSchema which retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Define a model 'User' using the userSchema
const User = model('User', userSchema);

module.exports = User;