var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var possible_values = ['M','F'];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"Coloca un e-mail válido"];

// function encrypt(text){
//   return crypto.createHash('md5').update(text).digest('hex');
// }


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

var User = mongoose.model('User',UserSchema);

module.exports = User;
