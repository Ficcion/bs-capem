/*jshint esversion: 6 */

// REQUIRES –importación de librerías–
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

/* VERIFICAR TOKEN */
exports.verificaToken = function(req, res, next) {

   var token = req.query.token;

   jwt.verify( token, SEED, (err, decoded) => {
   
      if (err) {
         return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto (desde middleware autenticar.js)',
            errors: err
         });
      }
   
      req.usuario = decoded.usuario;
      
      next();

   });
};

/* VERIFICAR ADMIN */
exports.verificaAdmin = function(req, res, next) {

   var usuario = req.usuario;

   if (usuario.role === 'ADMIN_ROLE') {
      next();
      return;
   } else {

      return res.status(401).json({
         ok: false,
         mensaje: 'Token incorrecto',
         errors: { message: 'No tiene permisos para ejecutar esta acción'}
      });

   }
};
   

