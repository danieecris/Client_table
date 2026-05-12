const { where } = require('sequelize');
const db = require('../models/index.js');
const Produto = db.Produto;
const produtoSchema = require('../validations/produtoValidation.js');

// Criar um novo produto
const createProduto = async (req, res) => {
  try{
    const{ nome, preco, descricao} = req.body;
    const novoProduto =  await Produto.create({
      nome,
      preco,
      descricao
    })

    res.status(200).json(novoProduto)
  }catch(error){
    res.status(500).json(error.message)
  }
}
// Obter todos os produtos
const getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      where: { ativo: true }
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
};

// Obter um produto por ID
const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

// Atualizar produto
const updateProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Produto.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedProduto = await Produto.findByPk(id);
      res.status(200).json(updatedProduto);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar o produto' });
  }
};

// Deletar produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Produto.update(
      {ativo: false}, 
      {where: { id }}
    );

    if (affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};

module.exports = {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
};
