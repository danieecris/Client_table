const ControllerCliente = require('../controllers/controller.cliente.js');
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Cliente
 *   description: Operações relacionadas a clientes
 */

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Cria um cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Cliente]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */

router.post('/', ControllerCliente.createCliente);
router.get('/', ControllerCliente.getAllClientes);

/**
 * @swagger
 * /cliente/{id}:
 *   get:
 *     summary: Busca cliente por ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     summary: Atualiza cliente por ID
 *     tags: [Cliente]
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *   delete:
 *     summary: Remove cliente por ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 */

router.get('/:id', ControllerCliente.getClientebyId);
router.put('/:id', ControllerCliente.updateCliente);
router.delete('/:id', ControllerCliente.deleteCliente);


module.exports = router;