const mongoose = require('mongoose');

const sponsoredPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String }, // Optional image
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SponsoredPost', sponsoredPostSchema);
