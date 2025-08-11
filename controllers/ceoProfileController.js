const CeoProfile = require('../models/CeoProfile');

// Get all CEO profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await CeoProfile.find().sort({ name: 1 });
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching CEO profiles:', error);
    res.status(500).json({ message: 'Server error fetching CEO profiles' });
  }
};

// Add a new CEO profile (supports multipart form with image and PDF upload or pdfUrl)
exports.addProfile = async (req, res) => {
  try {
    const { name, title, pdfUrl } = req.body;

    if (!name || !title) {
      return res.status(400).json({ message: 'Name and title are required' });
    }

    let imageUrl = null;
    let pdfFileUrl = null;

    // If files uploaded via multer
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      if (req.files.pdfFile && req.files.pdfFile[0]) {
        pdfFileUrl = `/uploads/${req.files.pdfFile[0].filename}`;
      }
    }

    // If no image uploaded
    if (!imageUrl) {
      return res.status(400).json({ message: 'Profile image is required' });
    }

    // Use uploaded PDF file URL if available, else pdfUrl from request body (URL string)
    const finalPdfUrl = pdfFileUrl || pdfUrl || null;

    if (!finalPdfUrl) {
      return res.status(400).json({ message: 'PDF file or PDF URL is required' });
    }

    const newProfile = new CeoProfile({
      name,
      title,
      imageUrl,
      pdfUrl: finalPdfUrl,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error adding CEO profile:', error);
    res.status(500).json({ message: 'Error adding CEO profile' });
  }
};
