const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

//rutas del crud proveedor
router.post('/', proveedorController.agregarProvedores);
router.get('/', proveedorController.buscarProveedores);
router.get('/:id', proveedorController.buscarProveedorPorId);
router.delete('/:id', proveedorController.eliminarProveedor);
router.put('/:id', proveedorController.editarProveedor);


module.exports = router;

