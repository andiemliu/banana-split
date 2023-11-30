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
  inputData: {
    people: [String],
    checkboxes: Object, 
  },
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
