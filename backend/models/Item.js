const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
  dateFound: { type: Date, default: Date.now },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);