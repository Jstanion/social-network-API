const router = require('express').Router();

// import controllers for each route
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/courseController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;