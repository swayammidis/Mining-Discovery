const mongoose = require('mongoose');

const taggedPostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String // Can be base64 or URL
    },
    tags: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true // ✅ Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('TaggedPost', taggedPostSchema);
