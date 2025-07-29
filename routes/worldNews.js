const express = require('express');
const router = express.Router();
const worldNewsController = require('../controllers/worldNewsController');

// @route   POST /api/world-news
// @desc    Create a new world news entry
router.post('/', worldNewsController.createWorldNews);

// @route   GET /api/world-news/latest
// @desc    Get latest 3 world news entries (for homepage)
router.get('/latest', worldNewsController.getLatestWorldNews);

// @route   GET /api/world-news
// @desc    Get all world news entries
router.get('/', worldNewsController.getAllWorldNews);

// @route   GET /api/world-news/:id
// @desc    Get a single world news entry by ID
router.get('/:id', worldNewsController.getWorldNewsById);

module.exports = router;
