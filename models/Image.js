var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model('Imagen', ImageSchema);
