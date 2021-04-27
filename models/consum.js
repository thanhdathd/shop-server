'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Consum belong to product
      Consum.belongsTo(models.Product, {foreignKey: 'productId'});
    }
  };
  Consum.init({
    optionId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Consum',
  });
  return Consum;
};