const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extansionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
   return new Promise((resolve, reject) => {
      // extraemos el archivo
      const { archivo } = files;

      //    Separamos el nombre del archivo
      const nombreCortado = archivo.name.split('.');

      // Extraer la extension del archivo
      const extension = nombreCortado[nombreCortado.length - 1];

      if (!extansionesValidas.includes(extension)) {
         return res.status(400).json({
            msg: `La extension ${extension} no es permitida ${extansionesValidas}`,
         });
      }

      //    Cambiar el nombre del archivo
      const nombreTemp = uuidv4() + '.' + extension;

      //    Cargar archivos
      const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

      archivo.mv(uploadPath, (err) => {
         if (err) {
            reject(err);
         }

         resolve(nombreTemp);
      });
   });
};

module.exports = {
   subirArchivo,
};
