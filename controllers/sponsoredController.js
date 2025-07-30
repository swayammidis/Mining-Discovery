const SponsoredPost = require('../models/SponsoredPost');

// Create
exports.createSponsoredPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const post = new SponsoredPost({ title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sponsored post' });
  }
};

// Get All
exports.getSponsoredPosts = async (req, res) => {
  try {
    const posts = await SponsoredPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sponsored posts' });
  }
};

// Get by ID (optional)
exports.getSponsoredPostById = async (req, res) => {
  try {
    const post = await SponsoredPost.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: 'Sponsored post not found' });
  }
};
