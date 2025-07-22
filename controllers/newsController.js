 const News = require('../models/News');

// POST: Add a new news article
exports.postNews = async (req, res) => {
  try {
    const { title, image, description, date, by } = req.body;

    if (!title || !date || !by) {
      return res.status(400).json({ message: 'Title, Date and Author are required.' });
    }

    const newNews = new News({ title, image, description, date, by });
    await newNews.save();

    res.status(201).json({
      message: 'News article created successfully.',
      news: newNews
    });
  } catch (err) {
    console.error('Error saving news:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch all news articles, sorted by date (latest first)
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await News.find().sort({ date: -1 });
    res.json(allNews);
  } catch (err) {
    console.error('Error fetching all news:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch latest 4 news articles
exports.getLatestNews = async (req, res) => {
  try {
    const latestNews = await News.find().sort({ date: -1 }).limit(4);
    res.json(latestNews);
  } catch (err) {
    console.error('Error fetching latest news:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch a single news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error('Error fetching news by ID:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch news articles from a specific year
exports.getNewsByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
      return res.status(400).json({ message: 'Invalid year format.' });
    }

    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const news = await News.find({ date: { $gte: start, $lt: end } }).sort({ date: -1 });
    res.json(news);
  } catch (err) {
    console.error('Error fetching news by year:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ GET: Fetch news older than the latest 4 articles
exports.getOlderNews = async (req, res) => {
  try {
    // Skip the first 4 (latest) and return the rest
    const olderNews = await News.find().sort({ date: -1 }).skip(4);
    res.json(olderNews);
  } catch (err) {
    console.error('Error fetching older news:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
