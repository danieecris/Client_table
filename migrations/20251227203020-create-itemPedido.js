'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itemPedido', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedido',
          key: 'id',

        }
      },
      produtoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produto',
          key: 'id'
        }
      },
      precoUnitario: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('itemPedido');
  }
};