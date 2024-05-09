const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//rutas del crud del cliente
router.post('/', clienteController.agregarClientes);
router.get('/', clienteController.buscarClientes);
router.get('/:id', clienteController.buscarPorId);
router.delete('/:id', clienteController.eliminarCliente);
router.put('/:id', clienteController.editarCliente);

module.exports = router;
