const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subscriber = require('../models/Subscriber');

// ✅ GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email role'); // Only return email and role
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ✅ UPDATE user role
router.put('/users/:id', async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User role updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// ✅ DELETE user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// ✅ GET all subscribers (for other admin pages)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscribers' });
  }
});

module.exports = router;
