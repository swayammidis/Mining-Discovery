const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const advertisementController = require('../controllers/advertisementController');

// ✅ Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists and is publicly accessible
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

// ✅ POST /api/ads/post → Create a new advertisement
router.post('/post', upload.single('image'), advertisementController.postAd);

// ✅ GET /api/ads → Retrieve all ads
router.get('/', advertisementController.getAds);

module.exports = router;
