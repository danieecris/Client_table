const ControlelerItemPedido = require('../controllers/controller.itempedido.js');

const express = require('express');
const router = express.Router();

router.post('/', ControlelerItemPedido.createItemPedido);
router.get('/', ControlelerItemPedido.getAllItemPedidos);
router.get('/:id', ControlelerItemPedido.getItemPedidobyId);
router.put('/:id', ControlelerItemPedido.updateItemPedido);
router.delete('/:id', ControlelerItemPedido.deleteItemPedido);

module.exports = router;