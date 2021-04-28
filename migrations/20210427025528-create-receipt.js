'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staffName: {
        type: Sequelize.STRING
      },
      staffPhone: {
        type: Sequelize.STRING
      },
      listProduct: {
        type: Sequelize.TEXT
      },
      additionalFee: {
        type: Sequelize.DOUBLE
      },
      discount: {
        type: Sequelize.DOUBLE
      },
      totalAmount: {
        type: Sequelize.DOUBLE
      },
      cash: {
        type: Sequelize.DOUBLE
      },
      change: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Receipts');
  }
};