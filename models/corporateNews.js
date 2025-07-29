// models/corporateNews.js
const mongoose = require('mongoose');

const corporateNewsSchema = new mongoose.Schema({
  title: String,
  description: String, // can be HTML from rich text editor
  image: String,       // URL or base64
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CorporateNews', corporateNewsSchema);
