const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String, // base64 string
    required: true
  },
  link: {
    type: String, // company website link
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/i.test(v); // must start with http or https
      },
      message: props => `${props.value} is not a valid URL`
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
