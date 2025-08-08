const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

// POST /api/banners — Store image as base64 in MongoDB
exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imagePath = path.join(__dirname, '../uploads', req.file.filename);

    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Create a valid base64 string with MIME type prefix
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;

    // Save to MongoDB
    const newBanner = new Banner({ image: base64Image });
    await newBanner.save();

    // Clean up: delete file from /uploads
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

    if (!banners || banners.length === 0) {
      return res.status(200).json([]);
    }

    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
};

// ✅ NEW: GET /api/banners — Fetch all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    if (!banners || banners.length === 0) {
      return res.status(200).json([]);
    }

    res.json(banners);
  } catch (error) {
    console.error('Error fetching all banners:', error);
    res.status(500).json({ message: 'Failed to fetch all banners' });
  }
};
