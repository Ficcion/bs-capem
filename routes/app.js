/*jshint esversion: 6 */

/* REQUIRES –IMPORTACIÓN DE LIBRERÍAS– */
var express = require('express');

/* INICIALIZAR VARIABLES */
var app = express();

/* RUTAS */
app.get('/', (req, res) => {
   res.status(200).json({
      ok: true,
      mensaje: 'GET funcionando (routes desde app.js)'
  });
});


module.exports = app;