const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createGoldNews,
  getGoldNews,
  getSingleGoldNews
} = require('../controllers/goldNewsController');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), createGoldNews);
router.get('/', getGoldNews);
router.get('/:id', getSingleGoldNews);

module.exports = router;
