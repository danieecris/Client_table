const ControllerProduto = require('../controllers/controller.produto.js');
const express = require('express');
const router = express.Router();

router.post('/', ControllerProduto.createProduto);
router.get('/', ControllerProduto.getAllProdutos);
router.get('/:id', ControllerProduto.getProdutoById);
router.put('/:id', ControllerProduto.updateProduto);
router.delete('/:id', ControllerProduto.deleteProduto);

module.exports = router;
    