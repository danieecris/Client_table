const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.Cliente = require('./cliente')(sequelize, DataTypes);
db.Produto = require('./produto')(sequelize, DataTypes);
db.Pedido = require('./pedido')(sequelize, DataTypes);
db.ItemPedido = require('./itempedido')(sequelize, DataTypes);

module.exports = db;
