const router = require('express').Router();

// import controllers for each route
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

