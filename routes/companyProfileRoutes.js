const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist, create if missing
const imageDir = path.join(__dirname, '../uploads/images');
const pdfDir = path.join(__dirname, '../uploads/pdfs');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') cb(null, imageDir);
    else if (file.fieldname === 'pdf') cb(null, pdfDir);
    else cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// POST: create new company profile with image and optional PDF
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  companyProfileController.createCompanyProfile
);

// GET: fetch all company profiles
router.get('/', companyProfileController.getAllCompanyProfiles);

module.exports = router;
