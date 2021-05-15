const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
   //Obtener los query params
   const { q, nombre, apikey } = req.query;

   res.json({
      message: 'get Api - controlador',
      q,
      nombre,
      apikey,
   });
};

const usuariosPut = (req, res) => {
   // obtener params
   const id = req.params.id;

   res.json({
      message: 'put Api - controlador',
      id,
   });
};

const usuariosPost = (req, res) => {
   // Obtener el body json
   const { nombre, edad } = req.body;

   res.status(201).json({
      message: 'post Api - controlador',
      nombre,
      edad,
   });
};

const usuariosDelete = (req, res) => {
   res.json({ message: 'delete Api - controlador' });
};

const usuariosPatch = (req, res) => {
   res.json({ message: 'patch Api - controlador' });
};

module.exports = {
   usuariosGet,
   usuariosPut,
   usuariosPost,
   usuariosDelete,
   usuariosPatch,
};
