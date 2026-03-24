const db = require('../models/index.js');
const Pedido = db.Pedido;

// Criar um novo pedido
const createPedido = async (req, res) => {
    if (!req.body.data || !req.body.valorTotal) {
        return res.status(400).json({ error: 'Data e valorTotal são obrigatórios' });
    }
    try {
        console.log("REQ BODY:", req.body);
        const pedido = await Pedido.create({
        clienteId:req.body.clienteId,
        data:req.body.data,
        valorTotal:req.body.valorTotal
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error("Erro ao criar o pedido", error);
        res.status(500).json({error: error.message});
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
