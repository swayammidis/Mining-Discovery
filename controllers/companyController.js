const CompanyNews = require('../models/CompanyNews');

// POST: Add a new company news article
exports.postCompanyNews = async (req, res) => {
  try {
    const { title, image, description, date, by } = req.body;

    if (!title || !date || !by) {
      return res.status(400).json({ message: 'Title, Date and Author are required.' });
    }

    const newCompanyNews = new CompanyNews({
      title,
      image,
      description,
      date,
      by
    });

    await newCompanyNews.save();

    res.status(201).json({
      message: 'Company news article created successfully.',
      news: newCompanyNews
    });
  } catch (err) {
    console.error('[POST Company News] Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch latest 4 company news
exports.getLatestCompanyNews = async (req, res) => {
  try {
    const news = await CompanyNews.find().sort({ date: -1 }).limit(4);
    res.json(news);
  } catch (err) {
    console.error('[GET Latest Company News] Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Fetch a single company news article by ID (for full view page)
exports.getCompanyNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;

    const article = await CompanyNews.findById(newsId);
    if (!article) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.status(200).json(article);
  } catch (err) {
    console.error('[GET Company News by ID] Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
