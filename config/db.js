var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.dbURI);

mongoose.connection.on('conected',function () {
  console.log('Conectado a la base de datos');
});

mongoose.connection.on('error', function (err) {
  console.error('Ha ocurrido un error '+err);
});

module.exports = mongoose.connection;
