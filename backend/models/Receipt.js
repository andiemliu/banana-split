const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
    required: true,
  },
  people: {
    type: [String],
    required: false,
  },
  checkboxes: {
    type: Object,
    required: false,
  }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
