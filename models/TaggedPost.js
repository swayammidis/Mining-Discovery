const mongoose = require('mongoose');

const taggedPostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      // You might want to store raw HTML from the editor, so no trim here
    },
    image: {
      type: String, // Can store base64 string or URL
      default: '',  // Default to empty string if no image provided
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function(arr) {
          return arr.length > 0; // Ensure at least one tag
        },
        message: 'At least one tag is required.',
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('TaggedPost', taggedPostSchema);
