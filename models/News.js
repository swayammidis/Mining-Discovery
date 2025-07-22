const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  by: { type: String, required: true },
  description: { type: String }, // Optional for full page view
  image: { type: String }, // Can be URL or base64
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
