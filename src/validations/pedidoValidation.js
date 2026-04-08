const Joi = require('joi');

const pedidoSchema = Joi.object({
    clienteId: Joi.number().required(),
    data: Joi.date().required(),
    valorTotal: Joi.number().required()

})

module.exports = pedidoSchema