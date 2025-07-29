const WorldNews = require('../models/worldNews');

// POST /api/world-news
// Create new world news
exports.createWorldNews = async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    if (!title || !description || !image || !author) {
      return res.status(400).json({ error: 'All fields (title, description, image, author) are required.' });
    }

    const newNews = new WorldNews({ title, description, image, author });
    await newNews.save();

    res.status(201).json(newNews);
  } catch (err) {
    console.error('Error creating world news:', err);
    res.status(500).json({ error: 'Failed to create world news.' });
  }
};

// GET /api/world-news
// Fetch all world news sorted by newest
exports.getAllWorldNews = async (req, res) => {
  try {
    const allNews = await WorldNews.find().sort({ date: -1 });
    res.json(allNews);
  } catch (err) {
    console.error('Error fetching all world news:', err);
    res.status(500).json({ error: 'Failed to fetch world news.' });
  }
};

// GET /api/world-news/:id
// Fetch single world news by ID
exports.getWorldNewsById = async (req, res) => {
  try {
    const news = await WorldNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.json(news);
  } catch (err) {
    console.error('Error fetching news by ID:', err);
    res.status(500).json({ error: 'Error fetching news by ID.' });
  }
};

// GET /api/world-news/latest
// Fetch latest 3 world news for homepage
exports.getLatestWorldNews = async (req, res) => {
  try {
    const latestNews = await WorldNews.find().sort({ date: -1 }).limit(3);
    res.json(latestNews);
  } catch (err) {
    console.error('Error fetching latest world news:', err);
    res.status(500).json({ error: 'Failed to fetch latest world news.' });
  }
};
