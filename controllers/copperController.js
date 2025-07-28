// controllers/copperController.js
const CopperNews = require('../models/CopperNews');

// POST new copper news
exports.postCopperNews = async (req, res) => {
  try {
    const { title, date, description, image } = req.body;
    const newNews = new CopperNews({ title, date, description, image });
    await newNews.save();
    res.status(201).json({ message: 'Copper news posted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post copper news', error: err.message });
  }
};

// GET all copper news
exports.getAllCopperNews = async (req, res) => {
  try {
    const news = await CopperNews.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch copper news', error: err.message });
  }
};

// GET single copper news by ID
exports.getCopperNewsById = async (req, res) => {
  try {
    const news = await CopperNews.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news', error: err.message });
  }
};
