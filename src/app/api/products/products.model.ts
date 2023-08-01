import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import User from "../users/users.model";
import Category from "../categories/categories.model";
import Image from "../images/images.model";
import Address from "../address/address.model";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  bidding: number;
  bidderId: number;
  basePrice: number;
  title: string;
  userId: number;
  categoryId: number;
  addressId: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public bidding!: number;
  public bidderId!: number;
  public basePrice!: number;
  public title!: string;
  public userId!: number;
  public categoryId!: number;
  public addressId!: number;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    Product.belongsTo(User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
    Product.hasMany(Category, {
      foreignKey: 'productId',
      sourceKey: 'id',
    });
    Product.hasMany(Image, {
      foreignKey: 'productId',
      sourceKey: 'id',
    });
    Product.hasOne(Address, {
      foreignKey: 'productId'
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    bidding: DataTypes.INTEGER,
    bidderId: DataTypes.INTEGER,
    basePrice: DataTypes.INTEGER,
    title: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      // references:{
      //   model: User,
      //   key: 'id'
      // }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Category,
      //   key: 'id'
      // }
    },
    addressId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Address,
      //   key: 'id'
      // }
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName:"products"
  }
);

export default Product;
