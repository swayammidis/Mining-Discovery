const mongoose = require('mongoose');

const taggedPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tags: [String], // ✅ Array of tags
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TaggedPost', taggedPostSchema);
