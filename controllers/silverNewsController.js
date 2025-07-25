// controllers/silverNewsController.js
const SilverNews = require('../models/SilverNews');
const path = require('path');

exports.createSilverNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imagePath = '';

    if (req.files && req.files.image) {
      const image = req.files.image;
      const filename = Date.now() + '-' + image.name;
      const uploadPath = path.join(__dirname, '../uploads', filename);

      await image.mv(uploadPath);
      imagePath = `/uploads/${filename}`;
    }

    const newNews = new SilverNews({ title, description, image: imagePath });
    await newNews.save();

    res.status(201).json({ message: 'Silver news posted successfully.' });
  } catch (err) {
    console.error('❌ Error in createSilverNews:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSilverNews = async (req, res) => {
  try {
    const newsList = await SilverNews.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    console.error('❌ Error in getSilverNews:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSilverNewsById = async (req, res) => {
  try {
    const newsItem = await SilverNews.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (err) {
    console.error('❌ Error in getSilverNewsById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
