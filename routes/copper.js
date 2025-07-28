// routes/copper.js
const express = require('express');
const router = express.Router();
const copperController = require('../controllers/copperController');

// Routes
router.post('/', copperController.postCopperNews);
router.get('/', copperController.getAllCopperNews);
router.get('/:id', copperController.getCopperNewsById);

module.exports = router;
