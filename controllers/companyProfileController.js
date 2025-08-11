const CompanyProfile = require('../models/CompanyProfile');

exports.createCompanyProfile = async (req, res) => {
  try {
    const { name, pdfUrl } = req.body;

    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Company name is required.' });
    }

    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({ error: 'Company logo image is required.' });
    }

    // Build paths for uploaded files
    const imageUrl = `/uploads/images/${req.files.image[0].filename}`;
    let pdfFilePath = null;

    if (req.files.pdf && req.files.pdf.length > 0) {
      pdfFilePath = `/uploads/pdfs/${req.files.pdf[0].filename}`;
    }

    // Create new company profile document
    const newProfile = new CompanyProfile({
      name: name.trim(),
      imageUrl,
      pdfUrl: pdfUrl && pdfUrl.trim() !== '' ? pdfUrl.trim() : null,
      pdfFilePath,
    });

    await newProfile.save();

    return res.status(201).json({ message: 'Company profile created successfully', profile: newProfile });
  } catch (error) {
    console.error('Error creating company profile:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllCompanyProfiles = async (req, res) => {
  try {
    const profiles = await CompanyProfile.find();
    return res.json(profiles);
  } catch (error) {
    console.error('Error fetching company profiles:', error);
    return res.status(500).json({ error: 'Failed to fetch company profiles' });
  }
};
