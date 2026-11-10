'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'produto',
          'estoque',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          }
        )
      ]);
    });
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          'produto',
          'estoque'
        )
      ]);
    });
  }
};
