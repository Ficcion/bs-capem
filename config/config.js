module.exports.SEED = process.env.SEMILLA;

module.exports.DE = process.env.REMITENTE;
module.exports.CONTRA = process.env.CONTRA;

/* ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* BASE DE DATOS */
var urlDB;

if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb://localhost:27017/capemDB';
   
} else {
   urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
