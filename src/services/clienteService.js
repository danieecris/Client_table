const { Op } = require('sequelize')
const db = require('../models')
const Cliente = db.Cliente

async function criarCliente(dados) {

    const { cpf, email } = dados

    const clienteExistente = await Cliente.findOne({

        where: {
            [Op.or]: [
                { cpf },
                { email }
            ]
        }
    });

    if (clienteExistente) {
        throw new Error("CPF ou EMAIL cliente ja foram cadastrados")
    }

    return Cliente.create(dados);
}


module.exports = { criarCliente }