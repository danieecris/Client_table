const db = require('../models/index.js');
const Pedido = db.Pedido;
const pedidoSchema = require('../validations/pedidoValidation')
const {criarPedido} = require('../services/pedidoService')

// Criar um novo pedido

const createPedido = async (req, res) => {
    try{
        const {clienteId, data, valorTotal} = req.body;
        const novoPedido = await Pedido.create({
            clienteId, 
            data, 
            valorTotal
        })
        res.status(201).json("O pedido foi criado com sucesso.");   
    
    }catch(error){
        res.status(400).json({ error: 'Erro ao criar pedido' });
    }

}

const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: {deletedAt: null}
        });

        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter pedidos' });
    }

};

const getPedidoById = async (req, res) => {
    const {id} = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({error: 'Pedido nao localizado'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter pedido' });
    }
}

const updatePedido = async (req, res) => {
    const {id} = req.params;
    try{
        const [updated] = await Pedido.update(req.body, {
            where: {id:id}
        });
        if(updated)
        {
            const updatePedido = await Pedido.findByPk(id);
            res.status(200).json(updatePedido);

        }  
        else{
            res.status(404).json({error: "Pedido nao localizado"});
        }
    } catch(errror){
        res.status(500).json({ error: "erro ao Alterar o pedido"})
    }
}
const deletePedido = async (req, res) => {
    const {id} = req.params;
    try{
        const deleted = await Pedido.update({
            deletedAt: new Date()
        }, {
            where: {id}
        });
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Pedido nao localizado"});
    }
} catch (error) {
    res.status(500).json({ error: "Erro ao deletar o pedido"});
}
}
module.exports = {
createPedido,
getAllPedidos,
 getPedidoById, 
 updatePedido, 
 deletePedido
}
