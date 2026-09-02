const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerJSDoc = swaggerJsdoc;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tabela_Clientes Node.js',
      version: '1.0.0',
      description: 'Documentação da API criada com Express e Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Servidor local',
      },
    ],
  },
  // Caminho para os arquivos onde você vai escrever os comentários do Swagger
  apis: ['./src/routes/*.js', './server.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// 2. Rota que servirá a documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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