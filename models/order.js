'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    name: DataTypes.STRING,
    staffName: DataTypes.STRING,
    staffPhone: DataTypes.STRING,
    listProduct: DataTypes.TEXT,
    note: DataTypes.STRING,
    status: Sequelize.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};