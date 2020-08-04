/*jshint esversion: 8 */

/* REQUIRES –IMPORTACIÓN DE LIBRERÍAS– */
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

/* INICIALIZAR VARIABLES */
var app = express();
var Usuario = require('../models/usuario');

/* AUTENTICACIÓN NORMAL */
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ empresa: body.empresa }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empresa.',
                errors: err
            });
        }

        // Valida empresa
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas.',
                errors: err
            });
        }

        // Valida password
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas.',
                errors: err
            });
        }

        // Crear un token
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 28800 });

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
});

module.exports = app;