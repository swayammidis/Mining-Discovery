const CompanyNews = require('../models/CompanyNews');

// POST new company news
exports.postCompanyNews = async (req, res) => {
  try {
    const { title, description, date, author } = req.body;
    let imageBase64 = '';

    const files = req.files || {};
    const imageFile = files.image?.[0];
    const imageUrl = req.body.imageUrl;

    if (imageFile) {
      // Convert uploaded image file to base64
      const img = imageFile.buffer.toString('base64');
      const mimeType = imageFile.mimetype;
      imageBase64 = `data:${mimeType};base64,${img}`;
    } else if (imageUrl && imageUrl.trim() !== '') {
      // Use image URL if provided
      imageBase64 = imageUrl.trim();
    }

    const news = new CompanyNews({
      title,
      description,
      date,
      author,
      image: imageBase64, // Either base64 image or external image URL
    });

    await news.save();
    res.status(201).json({ message: 'Company news posted successfully.', news });
  } catch (error) {
    console.error('Error posting company news:', error);
    res.status(500).json({ error: 'Failed to post company news.' });
  }
};

// GET all company news
exports.getCompanyNews = async (req, res) => {
  try {
    const newsList = await CompanyNews.find().sort({ date: -1 });
    res.status(200).json(newsList);
  } catch (error) {
    console.error('Error fetching company news:', error);
    res.status(500).json({ error: 'Failed to fetch company news.' });
  }
};

// GET single company news by ID
exports.getSingleCompanyNews = async (req, res) => {
  try {
    const news = await CompanyNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching single company news:', error);
    res.status(500).json({ message: 'Failed to fetch news.' });
  }
};
