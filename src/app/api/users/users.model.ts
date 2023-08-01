import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import { USER_ACCOUNT_STATUS, USER_GENDER } from "./user.constants";
import Image from "../images/images.model";
import Product from "../products/products.model";
import Session from "../sessions/sessions.model";
import Address from "../address/address.model";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date;
  phone: string;
  gender: USER_GENDER;
  status: USER_ACCOUNT_STATUS;
  username: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public dob!: Date;
  public phone!: string;
  public gender!: USER_GENDER;
  public status!: USER_ACCOUNT_STATUS;
  public username!: string;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    User.hasOne(Image, {
      foreignKey: 'foreignId',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    User.hasMany(Product, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    User.hasOne(Session, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    User.hasMany(Address, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'cascade'
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone: DataTypes.STRING,
    gender: DataTypes.ENUM(...Object.values(USER_GENDER)),
    status: DataTypes.ENUM(...Object.values(USER_ACCOUNT_STATUS)),
    username: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users"
  }
);

export default User;
