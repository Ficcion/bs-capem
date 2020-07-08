// REQUIRES –IMPORTACIÓN DE LIBRERÍAS–
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

// INICIALIZAR VARIABLES
var app = express();
var puerto = process.env.PORT || 3000;
var APP_R = process.env.APP_R || 'http://localhost:4200';

// Middleware CORS
app.use(cors({
    origin: APP_R,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Body Parser desde Express (MiddleWare)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// IMPORTAR RUTAS
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var encuestaRoutes = require('./routes/encuesta');
var correoRoutes = require('./routes/correo');

// CONEXIÓN A BASE DE DATOS
mongoose.connection.openUri(process.env.URLDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Base de Datos: \x1b[32m%s\x1b[0,', 'online');
    })
    .catch((err) => {
        console.error(err);
    });



// RUTAS (Con MiddleWare)
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/encuesta', encuestaRoutes);
app.use('/correo', correoRoutes);
app.use('/', appRoutes);



// ESCUCHAR PETICIONES
app.listen(puerto, () => {
    console.log(`Express Server puerto ${puerto}: \x1b[32m%s\x1b[0m`, ' online');
});