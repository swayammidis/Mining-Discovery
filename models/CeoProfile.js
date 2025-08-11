const mongoose = require('mongoose');

const ceoProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },  // path or URL to profile image
  pdfUrl: { type: String, required: true },    // path or URL to PDF profile/resume
});

module.exports = mongoose.model('CeoProfile', ceoProfileSchema);
