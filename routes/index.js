// Import the necessary module for creating a router
const router = require('express').Router();
// Import the API routes from the ./api directory
const apiRoutes = require('./api');

// Specify how the API routes should be handled using the apiRoutes module
router.use('/api', apiRoutes);
// Define a route handler for any routes that are not specified in apiRoutes module
router.use((req,res) => res.send('Incorrect Route!'));

// Export the router for external use
module.exports = router;