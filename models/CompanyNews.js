const mongoose = require('mongoose');

const companyNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  description: String,
  date: { type: Date, required: true },
  by: { type: String, required: true }
});

module.exports = mongoose.model('CompanyNews', companyNewsSchema);
