const Advertisement = require('../models/Advertisement');
const path = require('path');

exports.postAd = async (req, res) => {
  try {
    const { link, position, imageUrl } = req.body;
    let imagePath = '';

    if (req.file) {
      // Store uploaded filename (saved in /uploads)
      imagePath = req.file.filename;
    } else if (imageUrl && imageUrl.startsWith('http')) {
      // Store full external URL as-is
      imagePath = imageUrl;
    } else {
      return res.status(400).json({ error: 'No valid image provided.' });
    }

    const ad = new Advertisement({ image: imagePath, link, position });
    await ad.save();

    res.status(201).json({ message: 'Ad posted successfully.', ad });
  } catch (err) {
    console.error('Error posting ad:', err);
    res.status(500).json({ error: 'Failed to post ad.' });
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    console.error('Error fetching ads:', err);
    res.status(500).json({ error: 'Failed to fetch ads.' });
  }
};
