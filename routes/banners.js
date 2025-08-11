const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bannerController = require('../controllers/bannerController');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ✅ ROUTES

// Upload a banner with company link
router.post('/', upload.single('image'), bannerController.uploadBanner);

// Get latest 3 banners
router.get('/latest', bannerController.getLatestBanners);

// Get ALL banners
router.get('/', bannerController.getAllBanners);

module.exports = router;
