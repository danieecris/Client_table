const {Op} = require('sequelize')
const db = require("../models")
const ItemPedido = db.ItemPedido

async function criarItemPedido(dados){
    const {pedidoId, produtoId} = dados

    const itemPedidoExistente = await ItemPedido.FindOne({
        where:{ [Op.or]: pedidoId[{pedidoId}, {produtoId}]
        }
        
       
        })
    if (itemPedidoExistente) {
        throw new Error("Item do pedido já existe")
    }
        return ItemPedido.create(dados)


}

module.exports = {criarItemPedido}