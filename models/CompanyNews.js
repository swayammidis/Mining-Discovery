const mongoose = require('mongoose');

const companyNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  author: { type: String, required: true },
  image: { type: String }, // base64 string
});

module.exports = mongoose.model('CompanyNews', companyNewsSchema);
