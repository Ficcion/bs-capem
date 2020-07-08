module.exports.SEED = process.env.SEMILLA || 'uso-en-modo-local';

module.exports.DE = process.env.REMITENTE || 'pruebaswapp19@gmail.com';
module.exports.CONTRA = process.env.CONTRA || '12345678Kinich';

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
