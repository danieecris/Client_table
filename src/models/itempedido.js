'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemPedido extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ItemPedido.init({
        pedidoId: DataTypes.INTEGER,
        produtoId: DataTypes.INTEGER,
        quantidade: DataTypes.INTEGER,
        precoUnitario: DataTypes.FLOAT,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true    
        }
    }, {
        sequelize,
        modelName: 'ItemPedido',
        tableName: 'itemPedido',
        timestamps: false
    });
    return ItemPedido;
};