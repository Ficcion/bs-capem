/*jshint esversion: 6 */

/* REQUIRES -IMPORTACIÓN DE LIBRERÍAS– */
var express = require('express');

var mdAutenticar = require('../middlewares/autenticar');

/* INICIALIZAR VARIABLES */
var app = express();
var Encuesta = require('../models/encuesta');


/* OBTIENE TODAS LAS ENCUESTAS DE LA EMPRESA EN TURNO O TODAS SI ES ADMINISTRADOR */
app.get('/', mdAutenticar.verificaToken, (req, res) => {

   var codigo = req.usuario.empresa;
   var role = req.usuario.role;

   if (role === 'ADMIN_ROLE') {

      Encuesta.find({})
         .exec(
         ( err, encuestas ) => {
   
         if ( err ) {
            return res.status(500).json({
               ok: false,
               mensaje: 'Error al cargar encuestas.',
               errors: err
            });
         }
   
         Encuesta.countDocuments({}, (err, conteo) => {
   
            return res.status(200).json({
               ok: true,
               consultante: codigo,
               total: conteo,
               encuestas: encuestas,
               errore: err
            });
         });
      });
   }

   if (role === 'USUARIO_ROLE') {

      Encuesta.find({codigo: codigo})
         .exec(
         ( err, encuestas ) => {
   
         if ( err ) {
            return res.status(500).json({
               ok: false,
               mensaje: 'Error al cargar encuestas.',
               errors: err
            });
         }
   
         Encuesta.countDocuments({codigo: codigo}, (err, conteo) => {
   
            return res.status(200).json({
               ok: true,
               consultante: codigo,
               total: conteo,
               encuestas: encuestas,
               errore: err
            });
         });    
      });
   }
});


/* CREA UNA NUEVA ENCUESTA */
app.post('/', (req, res) => {

   var body = req.body;

   var encuesta = new Encuesta({
      codigo: body.codigo,
      numeroEmpleado: body.numeroEmpleado,
      fecha: body.fecha,
      fiebre: body.fiebre,
      tos: body.tos,
      diarrea: body.diarrea,
      vomito: body.vomito,
      calosfrios: body.calosfrios,
      dolorCabeza: body.dolorCabeza,
      dolorAbdominal: body.dolorAbdominal,
      dolorMuscular: body.dolorMuscular,
      dolorArticulaciones: body.dolorArticulaciones,
      debilidadMalestar: body.debilidadMalestar,
      secrecionNasal: body.secrecionNasal,
      dolorGarganta: body.dolorGarganta,
      conjuntivitis: body.conjuntivitis,
      sintomasComplicacion: body.sintomasComplicacion,
      diabetes: body.diabetes,
      presion: body.presion,
      enfermedadCorazon: body.enfermedadCorazon,
      enfermedadRenal: body.enfermedadRenal,
      enfermedadPulmonar: body.enfermedadPulmonar,
      cancer: body.cancer,
      inmunocompromiso: body.inmunocompromiso,
      vih: body.vih,
      ninguna: body.ninguna,
      sospechosoComplicacion: body.sospechosoComplicacion,
      sospechosoRiesgo: body.sospechosoRiesgo,
   });

   encuesta.save( (err, ecuestaGuardada) => {
      
      if (err) {
         return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear encuesta.',
            errors: err
         });
      }
      return res.status(201).json({
         ok: true,
         encuesta: ecuestaGuardada,
      });   
   });
});


/* ELIMINAR ENCUESTAS SI NO SON DE RIESGO -función de administrador- */
app.delete('/', [mdAutenticar.verificaToken, mdAutenticar.verificaAdmin], (req, res)  => {

   Encuesta.deleteMany({'$and': [{'sospechosoComplicacion': 'false'}, {'sospechosoRiesgo': 'false'}, {'fiebre': null}]}, (err, borradas) => {
      if (err) {
         return res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar encuestas.',
            errors: err
         });
      }

      if ( !borradas ) {
         return res.status(400).json({
            ok: false,
            mensaje: 'No existen encuestas con esas características.',
            errors: { message: 'No se encontraron encuestas con esas coincidencias.' }
         });
      }

      return res.status(200).json({
         ok: true,
         encuesta: borradas,
         borra: req.usuario
      });   
   });
});


module.exports = app;