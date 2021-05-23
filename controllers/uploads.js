const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

const cargarArchivo = (req, res = response) => {
   // Validando que venga el archivo desde req.files
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json('No hay archivos que subir');
      return;
   }

   // extraemos el archivo
   const { archivo } = req.files;

   //    Separamos el nombre del archivo
   const nombreCortado = archivo.name.split('.');

   // Extraer la extension del archivo
   const extension = nombreCortado[nombreCortado.length - 1];

   // Validar la extension del archivo
   const extansionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

   if (!extansionesValidas.includes(extension)) {
      return res.status(400).json({
         msg: `La extension ${extension} no es permitida, ${extansionesValidas}`,
      });
   }

   //    Cambiar el nombre del archivo
   const nombreTemp = uuidv4() + '.' + extension;

   //    Cargar archivos
   const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

   archivo.mv(uploadPath, (err) => {
      if (err) {
         console.log(err);
         return res.status(500).json({ err });
      }

      res.json({ msg: 'File uploaded to ' + uploadPath });
   });
};

module.exports = {
   cargarArchivo,
};
