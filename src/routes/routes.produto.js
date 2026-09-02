const ControllerProduto = require('../controllers/controller.produto.js');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produto
 *   description: Operações relacionadas a produtos
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produto]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */


router.post('/', ControllerProduto.createProduto);
router.get('/', ControllerProduto.getAllProdutos);

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Busca Produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *   put:
 *     summary: Atualiza Produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *   delete:
 *     summary: Remove Produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 */

router.get('/:id', ControllerProduto.getProdutoById);
router.put('/:id', ControllerProduto.updateProduto);
router.delete('/:id', ControllerProduto.deleteProduto);

module.exports = router;
    