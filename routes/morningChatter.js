const express = require('express');
const router = express.Router();
const controller = require('../controllers/morningChatterController');

// @route   POST /api/morning-chatter
// @desc    Create a new Morning Chatter post
router.post('/', controller.createMorningChatter);

// @route   GET /api/morning-chatter
// @desc    Get all Morning Chatter posts
router.get('/', controller.getAllMorningChatters);

// @route   GET /api/morning-chatter/latest
// @desc    Get latest 3 Morning Chatter posts
router.get('/latest', controller.getLatestMorningChatters);

// @route   GET /api/morning-chatter/:id
// @desc    Get a single Morning Chatter post by ID
router.get('/:id', controller.getMorningChatterById);

module.exports = router;
