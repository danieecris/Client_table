const ControllerCliente = require('../controllers/controller.cliente.js');
const express = require('express');
const router = express.Router();   

// Rotas para o CRUD de clientes
router.post('/', ControllerCliente.createCliente);
router.get('/', ControllerCliente.getAllClientes);
router.get('/:id', ControllerCliente.getClientebyId);   
router.put('/:id', ControllerCliente.updateCliente);
router.delete('/:id', ControllerCliente.deleteCliente);


module.exports = router;