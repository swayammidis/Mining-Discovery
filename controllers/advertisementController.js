const Advertisement = require('../models/Advertisement');
const path = require('path');

exports.postAd = async (req, res) => {
  try {
    const { link, position, imageUrl } = req.body;

    // Basic validation for link
    if (!link || !link.trim()) {
      return res.status(400).json({ error: 'Advertisement link is required.' });
    }

    let imagePath = '';

    if (req.file) {
      // Uploaded file: store relative path or filename as you prefer
      imagePath = `/uploads/${req.file.filename}`;
    } else if (imageUrl && imageUrl.trim().startsWith('http')) {
      // External image URL
      imagePath = imageUrl.trim();
    } else {
      return res.status(400).json({ error: 'No valid image provided.' });
    }

    const ad = new Advertisement({
      image: imagePath,
      link: link.trim(),
      position: position ? position.trim() : null,
    });

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
