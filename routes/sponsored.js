const express = require('express');
const router = express.Router();
const controller = require('../controllers/sponsoredController');

router.post('/', controller.createSponsoredPost);
router.get('/', controller.getSponsoredPosts);
router.get('/:id', controller.getSponsoredPostById);

module.exports = router;
