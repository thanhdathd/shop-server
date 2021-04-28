'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Receipt belong to Order
      //Receipt.belongsTo(models.Order, {foreignKey: 'orderId'});
      Receipt.belongsToMany(models.Order,{
        through: 'ReceiptOrders',
        as: 'orders',
        foreignKey: 'receiptId',
        otherKey: 'orderId'
      });
    }
  };
  Receipt.init({
    staffName: DataTypes.STRING,
    staffPhone: DataTypes.STRING,
    listProduct: DataTypes.TEXT,
    additionalFee: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    totalAmount: DataTypes.DOUBLE,
    cash: DataTypes.DOUBLE,
    change: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};