const Announcement = require('../models/announcement');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, author, image, description, date } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newAnnouncement = new Announcement({
      title: title.trim(),
      author: author?.trim() || 'Admin',
      image: image?.trim() || '',
      description: description.trim(),
      date: date ? new Date(date) : new Date()
    });

    const saved = await newAnnouncement.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating announcement:', err.message);
    res.status(500).json({ error: 'Failed to create announcement.' });
  }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Error fetching announcements:', err.message);
    res.status(500).json({ error: 'Failed to fetch announcements.' });
  }
};

// Get latest 3 announcements
exports.getLatestAnnouncements = async (req, res) => {
  try {
    const latest = await Announcement.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(latest);
  } catch (err) {
    console.error('Error fetching latest announcements:', err.message);
    res.status(500).json({ error: 'Failed to fetch latest announcements.' });
  }
};

// Get single announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ error: 'Announcement not found.' });
    res.status(200).json(announcement);
  } catch (err) {
    console.error('Error fetching announcement by ID:', err.message);
    res.status(500).json({ error: 'Failed to fetch announcement.' });
  }
};
