/* REQUIRES –IMPORTACIÓN DE LIBRERÍAS– */
var express = require('express');
const configMensaje = require('../config/configMensaje');

/* INICIALIZAR VARIABLES */
var app = express();

/* ENVÍA CORREO DE ALERTA DE RIESGO COVID-19 */
app.post('/', (req, res) => {

    configMensaje(req.body);
    res.status(200).send();
});


module.exports = app;