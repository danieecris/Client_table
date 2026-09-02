const ControllerPedido = require('../controllers/controller.pedido.js');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: Operações relacionadas a pedidos
 */

/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Cria um pedido
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientID:
 *                 type: integer
 *               productID:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */


router.post('/', ControllerPedido.createPedido);
router.get('/', ControllerPedido.getAllPedidos);

/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *   put:
 *     summary: Atualiza pedido por ID
 *     tags: [Pedido]
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
 *               clientID:
 *                 type: integer
 *               productID:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *   delete:
 *     summary: Remove pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 */
router.get('/:id', ControllerPedido.getPedidoById);
router.put('/:id', ControllerPedido.updatePedido);
router.delete('/:id', ControllerPedido.deletePedido);   

module.exports = router;