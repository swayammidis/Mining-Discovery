const mongoose = require('mongoose');

const leadershipThoughtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  image: { type: String }, // stores base64 or URL
  description: { type: String, required: true },
  date: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeadershipThought', leadershipThoughtSchema);
