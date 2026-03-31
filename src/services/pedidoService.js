const {op} = require('sequelize');
const db = require('../models');
const Pedido = db.Pedido;

async function criarPedido(dados){
    const {clienteId, data, valorTotal} = dados;

    const pedidoExistente = await Pedido.findOne({
        where:{[op.or]: [{clienteId}, {data}]}
    })
    if (pedidoExistente){
        throw new Error("Pedido ja cadastrado para esse cliente nessa data")
    }
    return Pedido.create(dados);

}

module.exports = {criarPedido}