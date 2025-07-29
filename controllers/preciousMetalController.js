const PreciousMetal = require('../models/preciousMetal');

// Create a new Precious Metal news
exports.createPreciousMetal = async (req, res) => {
  try {
    const { title, content, image, author } = req.body;

    // Validate required fields
    if (!title || !content || !image || !author) {
      return res.status(400).json({ error: 'All fields (title, content, image, author) are required.' });
    }

    // Save to database
    const metal = new PreciousMetal({ title, content, image, author });
    await metal.save();

    res.status(201).json(metal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create precious metal news.' });
  }
};

// Get all Precious Metal news (latest first)
exports.getAllPreciousMetals = async (req, res) => {
  try {
    const metals = await PreciousMetal.find().sort({ date: -1 });
    res.json(metals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch precious metal news.' });
  }
};

// Get a single Precious Metal news item by ID
exports.getPreciousMetalById = async (req, res) => {
  try {
    const metal = await PreciousMetal.findById(req.params.id);
    if (!metal) {
      return res.status(404).json({ error: 'Precious metal news not found.' });
    }
    res.json(metal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch precious metal by ID.' });
  }
};
