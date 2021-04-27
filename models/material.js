'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Material belong to materialcats
      Material.belongsTo(models.MaterialCat, {foreignKey: 'catId'});
    }
  };
  Material.init({
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    quantity: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};