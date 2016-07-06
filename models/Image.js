var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
  title: { type: String, required: true },
  urlImage: String,
  description: String,
  user: String
});

module.exports = mongoose.model('Image', ImageSchema);
