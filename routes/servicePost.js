const express = require('express');
const router = express.Router();
const servicePostController = require('../controllers/servicePostController');

router.post('/', servicePostController.createServicePost);
router.get('/', servicePostController.getAllServicePosts);
router.get('/tag/:tag', servicePostController.getPostsByTag);

module.exports = router;
