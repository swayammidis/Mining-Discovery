const express = require('express');
const router = express.Router();
const controller = require('../controllers/preciousMetalController');

router.post('/', controller.createPreciousMetal);
router.get('/', controller.getAllPreciousMetals);
router.get('/:id', controller.getPreciousMetalById);

module.exports = router;
