const LeadershipThought = require('../models/leadershipThought');

// ✅ Create a new Leadership Thought
exports.createLeadershipThought = async (req, res) => {
  try {
    const { title, author, image, description, date } = req.body;

    if (!title || !author || !description) {
      return res.status(400).json({ error: 'Title, author, and description are required.' });
    }

    const newThought = new LeadershipThought({
      title,
      author,
      image,
      description,
      date: date ? new Date(date) : new Date()  // Use provided date or default to now
    });

    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    console.error('Error creating leadership thought:', err);
    res.status(500).json({ error: 'Failed to post leadership thought.' });
  }
};

// ✅ Get all Leadership Thoughts
exports.getAllLeadershipThoughts = async (req, res) => {
  try {
    const thoughts = await LeadershipThought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    console.error('Error fetching all thoughts:', err);
    res.status(500).json({ error: 'Failed to fetch thoughts.' });
  }
};

// ✅ Get latest 3 Leadership Thoughts
exports.getLatestLeadershipThoughts = async (req, res) => {
  try {
    const thoughts = await LeadershipThought.find().sort({ createdAt: -1 }).limit(3);
    res.json(thoughts);
  } catch (err) {
    console.error('Error fetching latest thoughts:', err);
    res.status(500).json({ error: 'Failed to fetch latest thoughts.' });
  }
};

// ✅ Get Leadership Thought by ID
exports.getLeadershipThoughtById = async (req, res) => {
  try {
    const thought = await LeadershipThought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Leadership thought not found.' });
    }
    res.json(thought);
  } catch (err) {
    console.error('Error fetching thought by ID:', err);
    res.status(500).json({ error: 'Error fetching thought by ID.' });
  }
};
