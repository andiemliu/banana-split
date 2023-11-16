const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
    required: false,
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
