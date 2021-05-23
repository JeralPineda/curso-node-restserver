const { response } = require('express');

const validarArchivoSubir = (req, res = response, next) => {
   // Validando que venga el archivo desde req.files
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({ msg: 'No hay archivos que subir' });
   }

   next();
};

module.exports = {
   validarArchivoSubir,
};
