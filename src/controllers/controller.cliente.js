const db = require('../models/index.js');
const Cliente = db.Cliente;
const clienteSchema = require('../validations/clienteValidation')
const {criarCliente} = require('../services/clienteService')
// Criar um novo cliente
const createCliente = async (req,res) =>{
try{
const {nome, email, telefone, cpf} = req.body;
const novoCliente = await Cliente.create({
  nome,
  email,
  telefone,
  cpf
})
res.status(201).json(novoCliente);
}catch(err){
  return res.status(500).json({error: err.message})
}

};

const getAllClientes = async (req, res) => {
try {
  const cliente = await Cliente.findAll({
    where: {ativo: true}
  });
  res.status(200).json(cliente);
} catch (error) {
  console.error("erro ao cuscar o cliente", error);
  res.status(500).json({ error: error.message});
}
};


const getClientebyId = async (req, res) => {
  const {id} = req.params;
try {
const cliente = await Cliente.findByPk(id);
  if (cliente) {
    res.status(200).json(cliente);
  }
  else{
    res.status(400).json({error: "Cliente nao localizado"});
  }
  } catch (error) {
    console.error("error ao buscar o cliente de id: ", id, error);
    res.status(500).json(error.message);
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Cliente.update(req.body, {
      where: { id }
    });

    if (updated === 1) {
      const updatedCliente = await Cliente.findByPk(id);
      return res.status(200).json(updatedCliente);
    }

    return res.status(404).json({ error: "Cliente não encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao alterar o cliente" });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cliente.update({ativo: false}, {
      where: { id }
    });
    if (deleted[0] === 1) {
      return res.status(200).json({ message: "Cliente desativado com sucesso" });
    }
    return res.status(404).json({ error: "Cliente não encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao desativar o cliente" });
  }
};




module.exports = {
  createCliente,
  getAllClientes,
  getClientebyId,
  updateCliente,
  deleteCliente
};