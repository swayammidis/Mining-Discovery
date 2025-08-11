const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ceoProfileController = require('../controllers/ceoProfileController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists and is writable
  },
  filename: function (req, file, cb) {
    // To avoid collisions, prefix with timestamp + original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// GET all CEO profiles
router.get('/', ceoProfileController.getAllProfiles);

// POST new CEO profile with image and optional pdfFile uploads
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]),
  ceoProfileController.addProfile
);

module.exports = router;
