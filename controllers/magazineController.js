const Magazine = require('../models/Magazine');
const path = require('path');
const fs = require('fs');

// POST new magazine
exports.postMagazine = async (req, res) => {
  try {
    const { month, pdfLink } = req.body;

    // Handle cover image
    let coverImage = '';
    if (req.files && req.files['coverImage'] && req.files['coverImage'][0]) {
      coverImage = `/uploads/${req.files['coverImage'][0].filename}`;
    } else {
      return res.status(400).json({ message: 'Cover image is required.' });
    }

    // Handle PDF (either uploaded file or link)
    let pdf = '';
    if (req.files && req.files['pdf'] && req.files['pdf'][0]) {
      pdf = `/uploads/${req.files['pdf'][0].filename}`;
    } else if (pdfLink && pdfLink.startsWith('http')) {
      pdf = pdfLink;
    } else {
      return res.status(400).json({ message: 'Please upload a PDF file or provide a valid PDF link.' });
    }

    const magazine = new Magazine({
      coverImage,
      month,
      pdf,
    });

    await magazine.save();
    res.status(201).json({ message: 'Magazine uploaded successfully', magazine });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading magazine' });
  }
};

// GET all magazines
exports.getMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find().sort({ createdAt: -1 });
    res.json(magazines);
  } catch (err) {
    console.error('Get error:', err);
    res.status(500).json({ message: 'Failed to fetch magazines' });
  }
};

// DELETE a magazine by ID
exports.deleteMagazine = async (req, res) => {
  try {
    const { id } = req.params;

    const magazine = await Magazine.findById(id);
    if (!magazine) {
      return res.status(404).json({ message: 'Magazine not found' });
    }

    // Remove uploaded files from filesystem if they exist
    if (magazine.pdf && magazine.pdf.startsWith('/uploads/')) {
      const pdfPath = path.join(__dirname, '..', magazine.pdf);
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    }

    if (magazine.coverImage && magazine.coverImage.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', magazine.coverImage);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Magazine.findByIdAndDelete(id);
    res.json({ message: 'Magazine deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete magazine' });
  }
};
