const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  date: String,
  category: String,
  location: String,
  contact: String,
});

module.exports = mongoose.model('Post', PostSchema);