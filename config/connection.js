// Import necessary modules from mongoose
const { connect, connection } = require('mongoose');

// Establishing a connection to mongodb
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// Export the connection
module.exports = connection