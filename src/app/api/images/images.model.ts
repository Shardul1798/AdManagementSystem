import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import { IMAGES_TYPE } from "./images.constants";
import User from "../users/users.model";
import Product from "../products/products.model";
import Category from "../categories/categories.model";

interface ImageAttributes {
  id: number;
  foreignId: number;
  type: IMAGES_TYPE;
  media: Blob;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

class Image
  extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes
{
  public id!: number;
  public foreignId!: number;
  public media!: Blob;
  public type!: IMAGES_TYPE;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    Image.belongsTo(User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    Image.belongsTo(Product, {
      foreignKey: "productId",
      targetKey: "id",
    });
    Image.belongsTo(Category, {
      foreignKey: "categoryId",
      targetKey: "id",
    });
  }
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    foreignId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
    type: DataTypes.ENUM(...Object.values(IMAGES_TYPE)),
    media: DataTypes.BLOB("long"),
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
  }
);

export default Image;
