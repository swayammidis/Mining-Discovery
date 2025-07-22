const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const CompanyNews = require('../models/CompanyNews');

// POST: Add new company news
router.post('/', companyController.postCompanyNews);

// GET: Latest 4 company news
router.get('/latest', companyController.getLatestCompanyNews);

// GET: All company news for listing page
router.get('/all', async (req, res) => {
  try {
    const allNews = await CompanyNews.find().sort({ date: -1 });
    res.json(allNews);
  } catch (err) {
    console.error('Error fetching all company news:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ GET: Single news article by ID (for full view page)
router.get('/:id', companyController.getCompanyNewsById);

module.exports = router;
