const express = require('express');
const router = express.Router();
const corporateNewsController = require('../controllers/corporateNewsController');

// Create a new corporate news entry
router.post('/', corporateNewsController.createCorporateNews);

// Get all corporate news
router.get('/', corporateNewsController.getAllCorporateNews);

// ✅ Fetch latest N corporate news (default 3 if no limit provided)
router.get('/latest', corporateNewsController.getLatestCorporateNews);

// Get corporate news by ID (must come after /latest to avoid conflict)
router.get('/:id', corporateNewsController.getCorporateNewsById);

module.exports = router;
