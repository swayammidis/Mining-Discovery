const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  image: String, // base64 string or image URL
  link: String,  // optional: ad click URL
  position: String, // e.g., 'sidebar', 'footer', etc. if needed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);
