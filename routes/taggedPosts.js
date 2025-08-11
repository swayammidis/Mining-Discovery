const express = require('express');
const router = express.Router();
const taggedPostController = require('../controllers/taggedPostController');

// Create a new tagged post
router.post('/', taggedPostController.createTaggedPost);

// Get all tagged posts (latest first)
router.get('/', taggedPostController.getAllTaggedPosts);

// Get posts by a specific tag (e.g., /api/tagged-posts/tag/gold)
router.get('/tag/:tag', taggedPostController.getPostsByTag);

// Get a single tagged post by ID
router.get('/:id', taggedPostController.getTaggedPostById);

// Delete a tagged post by ID
router.delete('/:id', taggedPostController.deleteTaggedPost);

module.exports = router;
