// Create an Express router instance
const router = require('express').Router();

// Import controllers for each route from the userController module
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// Define routes for /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Define routes for /api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Define routes for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// Export the router module
module.exports = router;