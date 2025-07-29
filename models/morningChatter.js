const mongoose = require('mongoose');

const morningChatterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: { type: String, required: true },
  image: String, // base64 string or URL
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MorningChatter', morningChatterSchema);
