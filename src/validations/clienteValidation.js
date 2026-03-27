const Joi = require('joi');

const clienteSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().required(),
    cpf: Joi.string().required()
})

module.exports = clienteSchema