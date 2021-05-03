'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReceiptOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReceiptOrder.belongsTo(models.Receipt, {foreignKey: 'receiptId'});
      ReceiptOrder.belongsTo(models.Order, {foreignKey: 'orderId'});
    }
  };
  ReceiptOrder.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReceiptOrder',
  });
  return ReceiptOrder;
};