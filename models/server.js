const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosPath = '/api/usuarios';

      //   Conectar base de datos
      this.connectarDB();

      //   Middlewares
      this.middlewares();

      //   rutas de mi app
      this.routes();
   }

   async connectarDB() {
      await dbConnection();
   }

   middlewares() {
      //    CORS
      this.app.use(cors());

      //   Lectura y parseo del Body
      this.app.use(express.json());

      //    Directorio publico
      this.app.use(express.static('public'));
   }

   routes() {
      this.app.use(this.usuariosPath, require('../routes/usuarios'));
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(`Puerto corriendo en http://localhost:${this.port}`);
      });
   }
}

module.exports = Server;
