const path = require('path');
const fs = require('fs');
const { response } = require('express');

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res = response) => {
   try {
      //    txt, md
      //   const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');

      const nombre = await subirArchivo(req.files, undefined, 'imgs');

      res.json({
         nombre,
      });
   } catch (msg) {
      res.status(400).json({ msg });
   }
};

const actualizarImagen = async (req, res = response) => {
   const { id, coleccion } = req.params;

   let modelo;

   switch (coleccion) {
      case 'usuarios':
         //   Verificamos que el id exista en la BD
         modelo = await Usuario.findById(id);

         if (!modelo) {
            return res.status(400).json({
               msg: `No existe un usuario con el id: ${id}`,
            });
         }
         break;
      case 'productos':
         //   Verificamos que el id exista en la BD
         modelo = await Producto.findById(id);

         if (!modelo) {
            return res.status(400).json({
               msg: `No existe un producto con el id: ${id}`,
            });
         }
         break;

      default:
         return res.status(500).json({
            msg: 'Se me olvido validar esto',
         });
   }

   // Limpiar imágenes previas antes de guardar la nueva
   if (modelo.img) {
      // Hay que borrar la imagen del servidor
      const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);

      // Validamos si existe el archivo
      if (fs.existsSync(pathImg)) {
         // si existe la borro
         fs.unlinkSync(pathImg);
      }
   }

   // Directorio donde se guardara la imagen
   const nombre = await subirArchivo(req.files, undefined, coleccion);
   modelo.img = nombre;

   // Guardamos en la BD
   await modelo.save();

   res.json(modelo);
};

module.exports = {
   cargarArchivo,
   actualizarImagen,
};
