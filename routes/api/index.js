const router = require('express').Router();

// Import the user routes from the ./userRoutes file
const userRoutes = require('./userRoutes');

// Import the thought routes from the ./thoughtRoutes file
const thoughtRoutes = require('./thoughtRoutes');

// Mount the user routes under the /users base path
router.use('/users', userRoutes);

// Mount the thought routes under the /thoughts base path
router.use('/thoughts', thoughtRoutes);

module.exports = router;