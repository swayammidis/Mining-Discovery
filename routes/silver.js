// routes/silver.js
const express = require('express');
const router = express.Router();
const silverNewsController = require('../controllers/silverNewsController');

// POST a new silver news entry
router.post('/', silverNewsController.createSilverNews);

// GET all silver news
router.get('/', silverNewsController.getSilverNews);

// GET a single silver news item by ID
router.get('/:id', silverNewsController.getSilverNewsById);

module.exports = router;
