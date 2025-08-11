const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

// POST /api/banners — Store image + link in MongoDB
exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { link } = req.body;

    if (!link || !/^https?:\/\/.+/i.test(link)) {
      return res.status(400).json({ message: 'A valid company link is required' });
    }

    const imagePath = path.join(__dirname, '../uploads', req.file.filename);

    // Read image as buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Convert to base64 string
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;

    // Save banner with image + link
    const newBanner = new Banner({ image: base64Image, link });
    await newBanner.save();

    // Delete temp file
    fs.unlink(imagePath, err => {
      if (err) console.error('Failed to delete file:', err);
    });

    res.status(201).json({ message: 'Banner uploaded successfully', banner: newBanner });
  } catch (error) {
    console.error('Error uploading banner:', error);
    res.status(500).json({ message: 'Server error while uploading banner' });
  }
};

// GET /api/banners/latest — Fetch latest 3 banners
exports.getLatestBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 }).limit(3);

    if (!banners.length) {
      return res.status(200).json([]);
    }

    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
};

// GET /api/banners — Fetch all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    if (!banners.length) {
      return res.status(200).json([]);
    }

    res.json(banners);
  } catch (error) {
    console.error('Error fetching all banners:', error);
    res.status(500).json({ message: 'Failed to fetch all banners' });
  }
};
