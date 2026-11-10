const Joi = require('joi');

const produtoSchema = Joi. object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    preco: Joi.number().required(),
    estoque: Joi.number().min(0).required().integer()
})

module.exports = produtoSchema