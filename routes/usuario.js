/*jshint esversion: 6 */

/* REQUIRES -IMPORTACIÓN DE LIBRERÍAS– */
var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticar = require('../middlewares/autenticar');

/* INICIALIZAR VARIABLES */
var app = express();
var Usuario = require('../models/usuario');

/* OBTENER TODOS LOS USUARIOS -función de administrador- */
app.get('/', [mdAutenticar.verificaToken, mdAutenticar.verificaAdmin], (req, res) => {

   Usuario.find({})
      .exec(
      ( err, usuarios ) => {

      if ( err ) {
         return res.status(500).json({
            ok: false,
            mensaje: 'Error al cargar usuarios.',
            errors: err
         });
      }

      Usuario.countDocuments({}, (err, conteo) => {

         return res.status(200).json({
            ok: true,
            total: conteo,
            usuarios: usuarios,
            errors: err
         });
      });
   });
});

/* OBTENER UN USUARIO POR EMPRESA -función de administrador- */
app.get('/:empresa', [mdAutenticar.verificaToken, mdAutenticar.verificaAdmin], (req, res) => {
   
   var empresa = req.params.empresa;

   Usuario.findOne({empresa: empresa})
      .populate('usuario')
      .exec((err, usuario) => {

         if (err) {
            return res.status(500).json({
               ok: false,
               mensaje: 'Error al buscar usuario.',
               errors: err
            });
         }

         if (!usuario) {
            return res.status(400).json({
               ok: false,
               mensaje: 'El usuario ' + empresa + ' no existe.',
               errors: { message: 'No existe una empresa con ese usuario.'}
            });
         }

         return res.status(200).json({
            ok: true,
            usuario: usuario,
         });
      });
   }
);

/* CREAR UN NUEVO USUARIO -función de administrador- */
app.post('/', [mdAutenticar.verificaToken, mdAutenticar.verificaAdmin], (req, res) => {

   var body = req.body;
   
   var usuario = new Usuario({
      nombre: body.nombre,
      empresa: body.empresa,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role,
      activo: body.activo
   });

   usuario.save( (err, usuarioGuardado) => {
      
      if (err) {
         return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear usuario.',
            errors: err.message
         });
      }

      return res.status(201).json({
         ok: true,
         usuario: usuarioGuardado,
      });   
   });
});

/* ACTUALIZAR USUARIO POR ID -función de administrador- */
app.put('/:id', [mdAutenticar.verificaToken, mdAutenticar.verificaAdmin], (req, res) => {
   
   var id = req.params.id;
   var body = req.body;

   Usuario.findById(id, (err, usuario) => {

      if (err) {
         return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario.',
            errors: err
         });
      }

      if ( !usuario ) {
         return res.status(400).json({
            ok: false,
            mensaje: 'El id: ' + id + ' no corresponde a ningún usuario.',
            errors: err
         });
      }

      usuario.nombre = body.nombre;
      usuario.empresa = body.empresa;
      usuario.password = bcrypt.hashSync(body.password, 10);
      usuario.role = body.role;
      usuario.activo = body.activo;

      usuario.save((err, usuarioGuardado) => {

         if (err) {
            return res.status(400).json({
               ok: false,
               mensaje: 'Error al actualizar usuario.',
               errors: err
            });
         }

         return res.status(200).json({
            ok: true,
            usuario: usuarioGuardado,
         });      
      });
   });
});


module.exports = app;