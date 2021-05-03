'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('receipts', 'total', {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      after: 'totalAmount'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('receipts', 'total');
  }
};
