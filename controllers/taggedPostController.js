const TaggedPost = require('../models/TaggedPost');

// ✅ Create a new tagged post
exports.createTaggedPost = async (req, res) => {
  try {
    const { title, image, description, tags } = req.body;

    if (!title || !description || !tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    // Normalize tags to lowercase
    const lowercaseTags = tags.map(tag => tag.toLowerCase());

    const newPost = new TaggedPost({
      title,
      image,
      description,
      tags: lowercaseTags
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

// ✅ Get all tagged posts
exports.getAllTaggedPosts = async (req, res) => {
  try {
    const posts = await TaggedPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

// ✅ Get posts by tag (case-insensitive exact match using RegExp)
exports.getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    if (!tag) {
      return res.status(400).json({ message: 'Tag is required' });
    }

    const posts = await TaggedPost.find({
      tags: {
        $elemMatch: { $regex: new RegExp(`^${tag}$`, 'i') } // exact case-insensitive match
      }
    }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ message: `No posts found for tag: ${tag}` });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts by tag', error: err.message });
  }
};

// ✅ Get a single post by ID
exports.getTaggedPostById = async (req, res) => {
  try {
    const post = await TaggedPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post by ID', error: err.message });
  }
};
