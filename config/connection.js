const { connect, connection } = require('mongoose');

// wrap mongoose arounf local connection to mongodb
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// export the connection
module.exports = connection