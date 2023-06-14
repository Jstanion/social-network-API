const router = require('express').Router();

// imports the api routes form the ./api directory
const apiRoutes = require('./api');

// specifying how the api routes should be handled using the apiRoutes module
router.use('./api', apiRoutes);

// any routes that do not match the specified routes in apiRoutes module will return the provided response
router.use((req,res) => res.send('Incoreect Route!'));

module.exports = router;