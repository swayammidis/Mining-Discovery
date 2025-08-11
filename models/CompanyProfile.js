// models/CompanyProfile.js
const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    index: true, // add index for faster queries by name
    trim: true
  },
  imageUrl: { 
    type: String, 
    required: true,
    trim: true
  },
  pdfUrl: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Allow empty or null, or must start with http/https
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  pdfFilePath: { 
    type: String,
    trim: true
  },
}, { 
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
