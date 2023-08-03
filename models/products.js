'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    bidding: DataTypes.NUMBER,
    bidderId: DataTypes.NUMBER,
    basePrice: DataTypes.NUMBER,
    title: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER,
    addressId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};