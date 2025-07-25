// models/SilverNews.js
const mongoose = require('mongoose');

const silverNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // HTML content
  image: { type: String, default: '' }, // Image path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SilverNews', silverNewsSchema);
