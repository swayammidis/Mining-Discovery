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

    // Validate input: title, image file, and either a PDF file or a PDF URL are required.
    if (!title || !imageFile || (!pdfFile && !pdfUrl)) {
      return res.status(400).json({ error: 'Title, image, and either PDF file or URL are required.' });
    }

    let pdfBase64 = '';
    let pdfPath = '';

    if (pdfFile) {
      // If a PDF file is uploaded, read it, convert to base64, and set path.
      const filePath = path.join(uploadDir, pdfFile.filename);
      const fileBuffer = fs.readFileSync(filePath);
      pdfBase64 = fileBuffer.toString('base64');
      pdfPath = `/uploads/${pdfFile.filename}`;
    } else {
      // If a PDF URL is provided, use it directly.
      pdfBase64 = pdfUrl; // assuming it's already a base64 string or a valid URL
      pdfPath = pdfUrl;
    }

    const newFlipbook = new Flipbook({
      title,
      date: date || Date.now(), // Use provided date or current timestamp
      imageUrl: `/uploads/${imageFile.filename}`,
      pdfUrl: `data:application/pdf;base64,${pdfBase64}`, // Ensure data URL format
      pdfPath // Store the local path or external URL for reference
    });

    await newFlipbook.save(); // Save the new flipbook document to MongoDB
    res.status(201).json({ message: '✅ Flipbook uploaded successfully.' });

  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Server error during upload.' });
  }
});

// 🔽 Fetch All Flipbooks (aggregation with allowDiskUse)
router.get('/', async (req, res) => {
  try {
    // Perform aggregation with sorting by date in descending order.
    // The 'allowDiskUse: true' option permits MongoDB to use temporary files
    // on disk if the sort operation exceeds the in-memory limit, preventing
    // the "Sort exceeded memory limit" error.
    const flipbooks = await Flipbook.aggregate([
      { $sort: { date: -1 } }
    ], { allowDiskUse: true }); // THIS IS THE KEY FIX FOR YOUR PROBLEM

    res.json(flipbooks); // Send the fetched flipbooks as a JSON response
  } catch (err) {
    console.error('❌ Error fetching flipbooks:', err);
    res.status(500).json({ error: 'Server error while fetching flipbooks' });
  }
});

// 📥 Serve PDF from base64
router.get('/pdf/:id', async (req, res) => {
  try {
    const flipbook = await Flipbook.findById(req.params.id);
    if (!flipbook) {
      return res.status(404).json({ error: 'Flipbook not found' });
    }

    // Extract base64 data from the pdfUrl field.
    const base64Data = flipbook.pdfUrl.split(';base64,').pop();
    // Convert base64 string back to a buffer.
    const buffer = Buffer.from(base64Data, 'base64');

    // Set appropriate headers for PDF content.
    res.set({
      'Content-Type': 'application/pdf',
      // 'inline' suggests the browser should try to display the PDF directly
      // 'filename' provides a default name if the user downloads it.
      'Content-Disposition': `inline; filename="${flipbook.title.replace(/\s/g, '_')}.pdf"`
    });

    res.send(buffer); // Send the PDF buffer as the response body.
  } catch (err) {
    console.error('❌ Error serving flipbook PDF:', err);
    res.status(500).json({ error: 'Server error while serving PDF' });
  }
});

module.exports = router;