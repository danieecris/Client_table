const db = require('../models/index.js');

const ItemPedido = db.ItemPedido;


const createItemPedido = async (req, res) => {
  if (!req.body.pedidoId || !req.body.produtoId || !req.body.quantidade || !req.body.precoUnitario) {
    return res.status(400).json({ error: 'pedidoId, produtoId, quantidade e precoUnitario são obrigatórios' });
    }
    try {
        const itenmPedido = await ItemPedido.create(req.body);
    res.status(201).json(itenmPedido);
  } catch (error) {
    console.error("erro ao criar item do pedido", error);
    res.status(500).json({ error: error.message});
  }

    console.error("erro ao atualizar o cliente de id: ", id, error);
    res.status(500).json({ error: error.message});
};

const getAllItemPedidos = async (req, res) => {
try {
  const itemPedido = await ItemPedido.findAll();    
    res.status(200).json(itemPedido);
} catch (error) {
  console.error("erro ao cuscar o item do pedido", error);
  res.status(500).json({ error: error.message});
}
};

const getItemPedidobyId = async (req, res) => {
  const {id} = req.params;  
try {
    const itemPedido = await ItemPedido.findByPk(id);
  if (itemPedido) {
    res.status(200).json(itemPedido);
    }
    else{
    res.status(400).json({error: "Item do pedido nao localizado"});
    }
  } catch (error) {
    console.error("error ao buscar o item do pedido de id: ", id, error);
    res.status(500).json(error.message);
  }
};

const updateItemPedido = async (req, res) => {
  const {id} = req.params;
   const [updated] = await ItemPedido.updateItemPedido(req.body, {  
    where: {id: id}
    });
    try {
     if (updated) {
      const updatedItemPedido = await ItemPedido.findByPk(id);  
        res.status(200).json(updatedItemPedido);
    } else {
      res.status(404).json({ error: "Item do pedido não encontrado" });
     }
    } catch (error) {
    console.error("erro ao atualizar o item do pedido de id: ", id, error);
    res.status(500).json({ error: error.message});
}
}
    const deleteItemPedido = async (req, res) => {
    const {id} = req.params;
    try {
    const deleted = await ItemPedido.update({
        where: {id: id}
    });
    if (deleted) {
      res.status(204).send();
    }
    else {
      res.status(404).json({error: "Item do pedido nao encontrado"});
    }
    } catch (error) {
    console.error("erro ao deletar o item do pedido de id: ", id, error);
    res.status(500).json({ error: error.message});
}
    }

    module.exports = {
    createItemPedido,
    getAllItemPedidos,
    getItemPedidobyId,
    updateItemPedido,
    deleteItemPedido
    };
