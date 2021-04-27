'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products', // name of source model
      'categoryId', // name of the key will be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // name of target
          key: 'id', // key of target model referencing to
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // Receipt belong to order
      return queryInterface.addColumn(
        'Receipts', // source
        'orderId', // foreign key
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Orders', // target
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      // materials belongto materialcats
      return queryInterface.addColumn(
        'Materials', //source
        'catId', // foreign key
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'MaterialCats',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        // consums belong to products
        'Consums', //source
        'productId', // foreign key
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Products', // source model
      'categoryId' // key need to remove
    )
    .then( () => {
      return queryInterface.removeColumn(
        'Receipts', //source
        'orderId', // foreign key
      )
    })
    .then( () => {
      return queryInterface.removeColumn(
        'Materials', //source
        'catId', // foreign key
      )
    })
    .then( () => {
      return queryInterface.removeColumn(
        'Consums', //source
        'productId', // foreign key
      )
    })
  }
};
