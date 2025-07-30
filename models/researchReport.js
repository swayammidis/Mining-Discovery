const mongoose = require('mongoose');

const researchReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  image: { type: String, default: '' }, // Optional thumbnail or banner
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ResearchReport', researchReportSchema);
