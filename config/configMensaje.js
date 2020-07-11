var nodemailer = require('nodemailer');

var CONTRA = require('../config/config').CONTRA;
var DE = require('../config/config').DE;

module.exports = (correo) => {
   var transporter = nodemailer.createTransport({
      host: 'secure.emailsrvr.com',
      port: 465,
      secure: true,
      auth: {
         user: DE,
         pass: CONTRA
      }
   });

var mailOptions = {
   from: `”${correo.nombre}” <${DE}>`,
   to: `${correo.email}`,
   subject: `${correo.asunto}`,
   html: `${correo.mensaje}`
   };

   transporter.sendMail(mailOptions, (err, info) => {

      if (err) {
         console.log(err);

      } else {
    
         console.log(info);
      }
   });
}
