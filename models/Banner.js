const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String, // base64 string
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
