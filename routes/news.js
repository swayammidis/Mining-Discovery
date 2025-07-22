const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// POST: Add a new news article
router.post('/', newsController.postNews);

// GET: Fetch all news (for all-news.html) - Sorted by date (latest first)
router.get('/', newsController.getAllNews);

// GET: Fetch latest 4 news items (for index.html)
router.get('/latest', newsController.getLatestNews);

// ✅ Place BEFORE `/:id`
router.get('/year/:year', newsController.getNewsByYear);
router.get('/older', newsController.getOlderNews);

// This should always come last
router.get('/:id', newsController.getNewsById);

module.exports = router;
