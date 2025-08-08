const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const magazineController = require('../controllers/magazineController');

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists and is writable
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (
    (file.fieldname === 'coverImage' && file.mimetype.startsWith('image/')) ||
    (file.fieldname === 'pdf' && file.mimetype === 'application/pdf')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit: 10MB per file
  }
});

// Route to post a magazine (accepts coverImage and pdf upload OR pdf link)
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  magazineController.postMagazine
);

// Route to get all magazines
router.get('/', magazineController.getMagazines);

// ✅ Route to delete a magazine by ID
router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;
