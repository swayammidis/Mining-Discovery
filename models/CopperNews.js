// models/CopperNews.js
const mongoose = require('mongoose');

const copperNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL or base64
    required: false
  }
});

module.exports = mongoose.model('CopperNews', copperNewsSchema);
