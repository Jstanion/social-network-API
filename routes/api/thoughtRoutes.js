const router = require('express').Router();

// Import controllers for each route from the thoughtController module
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Define routes for /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// Define routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Define routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)

// Define routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;