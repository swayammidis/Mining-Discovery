const mongoose = require('mongoose');

const preciousMetalSchema = new mongoose.Schema({
  title: String,
  content: String, // updated from 'description' to 'content'
  image: String,   // can be a URL or base64 string
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PreciousMetal', preciousMetalSchema);
