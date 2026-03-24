const express = require('express');
const app = express();


app.use(express.json());

const clienteRoutes = require('./routes/routes.cliente.js');
const produtoRoutes = require('./routes/routes.produto.js');
const pedidoRoutes = require('./routes/routes.pedido.js');
const itemPedidoRoutes = require('./routes/routes.itemPedido.js');

app.use('/pedido', pedidoRoutes);
app.use('/produto', produtoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/itempedido', itemPedidoRoutes);


module.exports = app;