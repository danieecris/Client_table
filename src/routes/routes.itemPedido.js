const ControlelerItemPedido = require('../controllers/controller.itempedido.js');

const express = require('express');
const router = express.Router();

router.post('/itempedidos', ControlelerItemPedido.createItemPedido);
router.get('/itempedidos', ControlelerItemPedido.getAllItemPedidos);
router.get('/itempedidos/:id', ControlelerItemPedido.getItemPedidobyId);
router.put('/itempedidos/:id', ControlelerItemPedido.updateItemPedido);
router.delete('/itempedidos/:id', ControlelerItemPedido.deleteItemPedido);

module.exports = router;