const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // required: either a base64 string, file path, or image URL
    trim: true,
  },
  link: {
    type: String,
    required: true, // required: URL to navigate when ad is clicked
    trim: true,
  },
  position: {
    type: String,
    enum: ['sidebar', 'footer', 'header', 'inline', 'popup', ''], // example positions, adjust as needed
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Advertisement', advertisementSchema);
