import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import { ADDRESS_TYPE } from "./address.constants";
import User from "../users/users.model";
import Product from "../products/products.model";

interface AddressAttributes {
  id: number;
  houseNumber: number;
  streetNumber: number;
  area: string;
  landmark: string;
  city: string;
  country: string;
  zipcode: number;
  state: string;
  userId: number;
  addressType: ADDRESS_TYPE;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public houseNumber!: number;
  public streetNumber!: number;
  public area!: string;
  public landmark!: string;
  public city!: string;
  public country!: string;
  public zipcode!: number;
  public state!: string;
  public userId!: number;
  public addressType!: ADDRESS_TYPE;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    Address.belongsTo(User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    Address.belongsTo(Product, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    houseNumber: DataTypes.INTEGER,
    streetNumber: DataTypes.INTEGER,
    area: DataTypes.STRING,
    landmark: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    state: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
    addressType: DataTypes.ENUM(...Object.values(ADDRESS_TYPE)),
  },
  {
    sequelize,
    modelName: "Address",
  }
);

export default Address;
