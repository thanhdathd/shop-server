'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReceiptOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
    await queryInterface.addColumn(
      'ReceiptOrders', //source
      'receiptId', //fk
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Receipts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await queryInterface.addColumn(
        'ReceiptOrders', //source
        'orderId', //fk
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ReceiptOrders');
  }
};