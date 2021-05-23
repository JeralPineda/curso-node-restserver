const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarJWT, tieneRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [validarJWT, tieneRole('ADMIN_ROLE', 'VENTAS_ROLE')], cargarArchivo);

router.put('/:coleccion/:id', [check('id', 'el id debe de ser de Mongo').isMongoId(), check('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])), validarCampos], actualizarImagen);

module.exports = router;
