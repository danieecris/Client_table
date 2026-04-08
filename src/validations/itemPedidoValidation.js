const Joi = require ("joi")

const itemPedidoSchema = Joi.object({
    pedidoId: Joi.number().required(),
    produtoId: Joi.number().required(),
    quantidade: Joi.number().required(),
    precoUnitario: Joi.number().required()
})

module.exports = itemPedidoSchema