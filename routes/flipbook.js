const express = require('express');
const router = express.Router();
const Flipbook = require('../models/Flipbook');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// 🔼 Upload Flipbook (PDF + Image or PDF URL)
router.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, date, pdfUrl } = req.body;
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    if (!title || !imageFile || (!pdfFile && !pdfUrl)) {
      return res.status(400).json({ error: 'Title, image, and either PDF file or URL are required.' });
    }

    let pdfBase64 = '';
    let pdfPath = '';

    if (pdfFile) {
      const filePath = path.join(uploadDir, pdfFile.filename);
      const fileBuffer = fs.readFileSync(filePath);
      pdfBase64 = fileBuffer.toString('base64');
      pdfPath = `/uploads/${pdfFile.filename}`;
    } else {
      pdfBase64 = pdfUrl; // Assuming base64 string or external URL
      pdfPath = pdfUrl;
    }

    const newFlipbook = new Flipbook({
      title,
      date: date || Date.now(),
      imageUrl: `/uploads/${imageFile.filename}`,
      pdfUrl: `data:application/pdf;base64,${pdfBase64}`,
      pdfPath: pdfPath
    });

    await newFlipbook.save();
    res.status(201).json({ message: '✅ Flipbook uploaded successfully.' });

  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Server error during upload.' });
  }
});

// 🔽 Fetch All Flipbooks
router.get('/', async (req, res) => {
  try {
    const flipbooks = await Flipbook.find().sort({ date: -1 });
    res.json(flipbooks);
  } catch (err) {
    console.error('❌ Error fetching flipbooks:', err);
    res.status(500).json({ error: 'Server error while fetching flipbooks' });
  }
});

// 📥 New Route: Serve PDF from base64
router.get('/pdf/:id', async (req, res) => {
  try {
    const flipbook = await Flipbook.findById(req.params.id);
    if (!flipbook) return res.status(404).json({ error: 'Flipbook not found' });

    const base64Data = flipbook.pdfUrl.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${flipbook.title.replace(/\s/g, '_')}.pdf"`,
    });

    res.send(buffer);
  } catch (err) {
    console.error('❌ Error serving flipbook PDF:', err);
    res.status(500).json({ error: 'Server error while serving PDF' });
  }
});

module.exports = router;
