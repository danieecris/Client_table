const ControllerPedido = require('../controllers/controller.pedido.js');
const express = require('express');
const router = express.Router();

router.post('/', ControllerPedido.createPedido);
router.get('/', ControllerPedido.getAllPedidos);
router.get('/:id', ControllerPedido.getPedidoById);
router.put('/:id', ControllerPedido.updatePedido);
router.delete('/:id', ControllerPedido.deletePedido);   

module.exports = router;