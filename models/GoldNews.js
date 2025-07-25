const mongoose = require('mongoose');

const goldNewsSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String, // CKEditor HTML
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GoldNews', goldNewsSchema);
