var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
   values: ['ADMIN_ROLE', 'USUARIO_ROLE'],
   message: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
   nombre: {
      type: String,
      unique: true,
      required: [true, 'El nombre es obligatorio'],
   },
   empresa: {
      type: String,
      unique: true,
      required: [true, 'La empresa es obligatoria'],
   },
   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
   },
   role: {
      type: String,
      required: true,
      default: 'USUARIO_ROLE',
      enum: rolesValidos
   },
   activo: {
      type: String,
      required: true,
      default: true,
   },
});

/* QUITAR CAMPO PASSWORD DE LA RESPUESTA */
usuarioSchema.methods.toJSON = function() {
   var user = this;
   var userObject = user.toObject();
   delete userObject.password;

   return userObject;
};

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} ya existe en la base de datos.'});

module.exports = mongoose.model('Usuario', usuarioSchema); 