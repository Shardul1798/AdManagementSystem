'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    houseNumber: DataTypes.NUMBER,
    streetNumber: DataTypes.NUMBER,
    area: DataTypes.STRING,
    landmark: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.NUMBER,
    state: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    addressType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};