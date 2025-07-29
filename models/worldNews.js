// models/worldNews.js
const mongoose = require('mongoose');

const worldNewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // URL or base64
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WorldNews', worldNewsSchema);
