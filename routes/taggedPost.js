const express = require('express');
const router = express.Router();
const controller = require('../controllers/taggedPostController');

// 🔹 Create a tagged post
router.post('/', controller.createTaggedPost);

// 🔹 Get all tagged posts
router.get('/', controller.getAllTaggedPosts);

// 🔹 Get posts by tag (e.g., /api/tagged-posts/tag/gold)
router.get('/tag/:tag', controller.getPostsByTag);

// 🔹 Get single post by ID
router.get('/:id', controller.getTaggedPostById);

module.exports = router;
