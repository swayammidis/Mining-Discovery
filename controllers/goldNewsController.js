const GoldNews = require('../models/GoldNews');

// POST: Create a new gold news entry
exports.createGoldNews = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const news = new GoldNews({
      title,
      author,
      description,
      image
    });

    await news.save();
    res.status(201).json({ message: 'Gold news posted successfully', news });
  } catch (error) {
    console.error('Error creating gold news:', error);
    res.status(500).json({ error: 'Failed to post gold news' });
  }
};

// GET: Fetch all gold news (latest first)
exports.getGoldNews = async (req, res) => {
  try {
    const news = await GoldNews.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error fetching gold news:', error);
    res.status(500).json({ error: 'Failed to fetch gold news' });
  }
};

// GET: Fetch single gold news by ID
exports.getSingleGoldNews = async (req, res) => {
  try {
    const news = await GoldNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'Gold news not found' });
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching gold news by ID:', error);
    res.status(500).json({ error: 'Failed to fetch gold news' });
  }
};
