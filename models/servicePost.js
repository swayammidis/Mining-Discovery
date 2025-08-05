const mongoose = require('mongoose');

const servicePostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // CKEditor HTML content
  image: { type: String }, // URL or path
  author: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServicePost', servicePostSchema);
