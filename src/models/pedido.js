'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pedido extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Pedido.init({
        clienteId: DataTypes.INTEGER,
        data: DataTypes.DATEONLY,
        valorTotal: DataTypes.FLOAT,
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
        modelName: 'Pedido',
        tableName: 'pedido',
        timestamps: false
    });
    return Pedido;
};