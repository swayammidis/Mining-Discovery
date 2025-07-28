const mongoose = require('mongoose');

const projectNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  by: { type: String, required: true },
  description: { type: String, required: true }, // HTML content
  image: { type: String }, // image URL or base64
}, { timestamps: true });

module.exports = mongoose.model('ProjectNews', projectNewsSchema);
