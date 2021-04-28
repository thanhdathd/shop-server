'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'status', 
    {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'new',
      after: 'note' // after option is only supported by MySQL
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'status');
  }
};
