const express = require('express');
const router = express.Router();
const Flipbook = require('../models/Flipbook');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// 📌 POST flipbook
router.post('/post', upload.single('pdf'), async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!req.file) return res.status(400).json({ error: 'No PDF file uploaded.' });

    const pdfBase64 = req.file.buffer.toString('base64');

    const newFlipbook = new Flipbook({
      title,
      imageUrl,
      pdfUrl: `data:application/pdf;base64,${pdfBase64}`,
      pdfPath: req.file.filename
    });

    await newFlipbook.save();
    res.status(201).json({ message: 'Flipbook uploaded successfully.', flipbook: newFlipbook });
  } catch (err) {
    console.error('Error posting flipbook:', err);
    res.status(500).json({ error: 'Failed to upload flipbook.' });
  }
});

// 📌 GET all flipbooks
router.get('/', async (req, res) => {
  try {
    const flipbooks = await Flipbook.find().sort({ date: -1 });
    res.json(flipbooks);
  } catch (err) {
    console.error('Error fetching flipbooks:', err);
    res.status(500).json({ error: 'Failed to fetch flipbooks.' });
  }
});

// ✅ NEW: GET top 2 latest flipbooks
router.get('/top2', async (req, res) => {
  try {
    const topFlipbooks = await Flipbook.find().sort({ date: -1 }).limit(2);
    res.json(topFlipbooks);
  } catch (err) {
    console.error('Error fetching top flipbooks:', err);
    res.status(500).json({ error: 'Failed to fetch top flipbooks.' });
  }
});

module.exports = router;
