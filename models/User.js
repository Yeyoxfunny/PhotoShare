var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var possible_values = ['M','F'];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"Coloca un e-mail válido"];

var UserSchema = new Schema({
  name: String,
  username: {type: String, maxlength: [20, 'Nombre de usuario muy grande']},
  email: {type: String, match: email_match, unique: true, required: 'El correo es obligatorio'},
  password: {type: String, minlength:[8, 'La contraseña es muy corta']},
  birthdate: Date,
  gender: {type: String, enum: { values: possible_values, message: 'Opción no válida, solo Masculino o Femenino'}}
});

UserSchema.virtual('passwordConfirmation')
  .get(function () {
    return this.p_Confirmation;
  })
  .set(function (password) {
    this.p_Confirmation = password;
  });

// Método para encriptar la contraseña
UserSchema.methods.hasPassword = function (myPlaintextPassword, cb) {
  bcrypt.genSalt(10, function (err, salt) {
    if(err){
      return cb('Ocurrio un error');
    }
    bcrypt.hash(myPlaintextPassword, salt, function (err, data) {
      if(err){
        return cb('Ocurrio un error');
      }
      cb(null, data);
    });
  });
};

//Método para comparar contraseñas en el login
UserSchema.methods.comparePassword = function (candidatePassword, hashedPassword, cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
    if(err){
      return cb(err);
    }
    return cb(null, isMatch);
  });
};


// Antes de insertar encripta la contraseña
UserSchema.pre('save', function (next) {
  var user = this;
  this.hasPassword(user.password, function (err, hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});


var User = mongoose.model('User',UserSchema);

module.exports = User;
