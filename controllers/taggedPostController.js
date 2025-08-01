const TaggedPost = require('../models/TaggedPost');

// ✅ Create a new tagged post
exports.createTaggedPost = async (req, res) => {
  try {
    const { title, image, description, tags } = req.body;

    // Basic validation
    if (!title || !description || !tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'Title, description, and at least one tag are required.' });
    }

    // Normalize tags to lowercase and trim
    const normalizedTags = tags.map(tag => tag.toLowerCase().trim());

    const newPost = new TaggedPost({
      title: title.trim(),
      image: image?.trim() || '',
      description: description.trim(),
      tags: normalizedTags,
    });

    await newPost.save();
    res.status(201).json({ message: 'Tagged post created successfully', post: newPost });
  } catch (err) {
    console.error('Error creating tagged post:', err);
    res.status(500).json({ message: 'Server error while creating tagged post', error: err.message });
  }
};

// ✅ Get all tagged posts (latest first)
exports.getAllTaggedPosts = async (req, res) => {
  try {
    const posts = await TaggedPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching all tagged posts:', err);
    res.status(500).json({ message: 'Server error while fetching all tagged posts', error: err.message });
  }
};

// ✅ Get posts by tag (case-insensitive match)
exports.getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag?.toLowerCase().trim();

    if (!tag) {
      return res.status(400).json({ message: 'Tag is required in the request.' });
    }

    const posts = await TaggedPost.find({
      tags: { $in: [new RegExp(`^${tag}$`, 'i')] }
    }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ message: `No posts found for tag: ${tag}` });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error fetching posts by tag "${req.params.tag}":`, err);
    res.status(500).json({ message: 'Server error while fetching posts by tag', error: err.message });
  }
};

// ✅ Get a single tagged post by ID
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
  } catch (err) {
    console.error(`Error fetching tagged post by ID "${req.params.id}":`, err);
    res.status(500).json({ message: 'Server error while fetching tagged post by ID', error: err.message });
  }
};
