const MorningChatter = require('../models/morningChatter');

// @desc    Create a new Morning Chatter post
// @route   POST /api/morning-chatter
exports.createMorningChatter = async (req, res) => {
  try {
    const { title, author, image, description, date } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newChatter = new MorningChatter({
      title: title.trim(),
      author: author?.trim() || 'Admin',
      image: image?.trim() || '',
      description: description.trim(),
      date: date ? new Date(date) : new Date()
    });

    const savedChatter = await newChatter.save();
    res.status(201).json(savedChatter);
  } catch (error) {
    console.error('Error creating Morning Chatter:', error.message);
    res.status(500).json({ error: 'Failed to create Morning Chatter post.' });
  }
};

// @desc    Get all Morning Chatter posts
// @route   GET /api/morning-chatter
exports.getAllMorningChatters = async (req, res) => {
  try {
    const chatters = await MorningChatter.find().sort({ date: -1 }); // sorted by actual post date
    res.status(200).json(chatters);
  } catch (error) {
    console.error('Error fetching Morning Chatters:', error.message);
    res.status(500).json({ error: 'Failed to fetch Morning Chatter posts.' });
  }
};

// @desc    Get the latest 3 Morning Chatter posts
// @route   GET /api/morning-chatter/latest
exports.getLatestMorningChatters = async (req, res) => {
  try {
    const latestChatters = await MorningChatter.find()
      .sort({ date: -1 }) // sorted by actual post date
      .limit(3);
    res.status(200).json(latestChatters);
  } catch (error) {
    console.error('Error fetching latest Morning Chatters:', error.message);
    res.status(500).json({ error: 'Failed to fetch latest Morning Chatter posts.' });
  }
};

// @desc    Get a single Morning Chatter post by ID
// @route   GET /api/morning-chatter/:id
exports.getMorningChatterById = async (req, res) => {
  try {
    const chatter = await MorningChatter.findById(req.params.id);
    if (!chatter) {
      return res.status(404).json({ error: 'Morning Chatter post not found.' });
    }
    res.status(200).json(chatter);
  } catch (error) {
    console.error('Error fetching Morning Chatter by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch Morning Chatter post.' });
  }
};
