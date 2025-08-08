const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  coverImage: {
    type: String, // URL or path to image
    required: true
  },
  month: {
    type: String,
    required: true
  },
  pdf: {
    type: String, // Can be a local path (from upload) or an external link
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Magazine', magazineSchema);
