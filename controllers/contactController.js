const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;

    // Trim inputs
    name = name?.trim();
    email = email?.trim().toLowerCase();
    subject = subject?.trim();
    message = message?.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Create and save message
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully.', id: newMessage._id });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Fetch all contact messages (latest first)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Server error while fetching messages.', error: error.message });
  }
};

// Delete a contact message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Message ID required.' });

    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Message not found.' });

    res.status(200).json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Server error while deleting message.', error: error.message });
  }
};
