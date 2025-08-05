const ServicePost = require('../models/servicePost');

// POST a new service post
exports.createServicePost = async (req, res) => {
  try {
    const { title, content, image, author, tags } = req.body;

    const newPost = new ServicePost({
      title,
      content,
      image,
      author,
      tags
    });

    await newPost.save();
    res.status(201).json({ message: 'Service post created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET all service posts
exports.getAllServicePosts = async (req, res) => {
  try {
    const posts = await ServicePost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts.' });
  }
};

// GET posts by tag
exports.getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await ServicePost.find({ tags: tag });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching by tag.' });
  }
};
