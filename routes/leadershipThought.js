const express = require('express');
const router = express.Router();
const leadershipThoughtController = require('../controllers/leadershipThoughtController');

// ✅ Create a new Leadership Thought
router.post('/', leadershipThoughtController.createLeadershipThought);

// ✅ Get all Leadership Thoughts (sorted by newest first)
router.get('/', leadershipThoughtController.getAllLeadershipThoughts);

// ✅ Get latest 3 Leadership Thoughts
router.get('/latest', leadershipThoughtController.getLatestLeadershipThoughts);

// ✅ Get a single Leadership Thought by ID
router.get('/:id', leadershipThoughtController.getLeadershipThoughtById);

module.exports = router;
