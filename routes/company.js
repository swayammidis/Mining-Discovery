const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data
const companyController = require('../controllers/companyController');

// ✅ Accept both image file and imageUrl (text field)
router.post(
  '/post',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'imageUrl', maxCount: 1 }
  ]),
  companyController.postCompanyNews
);

// GET route to fetch all news
router.get('/', companyController.getCompanyNews);

// GET route to fetch single news by ID
router.get('/:id', companyController.getSingleCompanyNews);

module.exports = router;
