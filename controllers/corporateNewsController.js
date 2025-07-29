const CorporateNews = require('../models/corporateNews');

// POST /api/corporate-news
exports.createCorporateNews = async (req, res) => {
  try {
    const { title, description, image, author } = req.body;
    if (!title || !description || !image || !author) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const news = new CorporateNews({ title, description, image, author });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create corporate news.' });
  }
};

// GET /api/corporate-news
exports.getAllCorporateNews = async (req, res) => {
  try {
    const news = await CorporateNews.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch corporate news.' });
  }
};

// GET /api/corporate-news/latest?limit=3
exports.getLatestCorporateNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const news = await CorporateNews.find()
      .sort({ date: -1 })
      .limit(limit);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest corporate news.' });
  }
};

// GET /api/corporate-news/:id
exports.getCorporateNewsById = async (req, res) => {
  try {
    const news = await CorporateNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching news by ID.' });
  }
};
