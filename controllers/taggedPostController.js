const TaggedPost = require('../models/TaggedPost');

// Create a new tagged post
exports.createTaggedPost = async (req, res) => {
  try {
    const { author, title, image = '', description, tags } = req.body;

    // Validation
    if (!author?.trim() || !title?.trim() || !description?.trim() || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'Author, title, description, and at least one tag are required.' });
    }

    // Normalize tags (lowercase + trim)
    const normalizedTags = tags.map(tag => tag.toLowerCase().trim());

    const newPost = new TaggedPost({
      author: author.trim(),
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      tags: normalizedTags
    });

    await newPost.save();

    res.status(201).json({ message: 'Tagged post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating tagged post:', error);
    res.status(500).json({ message: 'Server error while creating tagged post', error: error.message });
  }
};

// Get all tagged posts (newest first)
exports.getAllTaggedPosts = async (req, res) => {
  try {
    const posts = await TaggedPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching all tagged posts:', error);
    res.status(500).json({ message: 'Server error while fetching all tagged posts', error: error.message });
  }
};

// Get posts by tag (case-insensitive exact match)
exports.getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag?.toLowerCase().trim();

    if (!tag) {
      return res.status(400).json({ message: 'Tag parameter is required.' });
    }

    const posts = await TaggedPost.find({
      tags: { $in: [new RegExp(`^${tag}$`, 'i')] }
    }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ message: `No posts found for tag: ${tag}` });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error fetching posts by tag "${req.params.tag}":`, error);
    res.status(500).json({ message: 'Server error while fetching posts by tag', error: error.message });
  }
};

// Get a single tagged post by ID
exports.getTaggedPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required.' });
    }

    const post = await TaggedPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Tagged post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(`Error fetching tagged post by ID "${req.params.id}":`, error);
    res.status(500).json({ message: 'Server error while fetching tagged post by ID', error: error.message });
  }
};

// Delete a tagged post by ID
exports.deleteTaggedPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required.' });
    }

    const deletedPost = await TaggedPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Tagged post not found' });
    }

    res.status(200).json({ message: 'Tagged post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting tagged post by ID "${req.params.id}":`, error);
    res.status(500).json({ message: 'Server error while deleting tagged post', error: error.message });
  }
};
