const mongoose = require('mongoose');

const FlipbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  pdfUrl: { type: String, required: true }, // base64
  pdfPath: { type: String }, // local file path for optional download
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flipbook', FlipbookSchema);
