import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import Product from "../products/products.model";
import Image from "../images/images.model";

interface CategoryAttributes {
  id: number;
  name: string;
  parentId: number;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public parentId!: number;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    Category.belongsTo(Product, {
      foreignKey: 'prodcutId',
      targetKey: 'id'
    });
    Category.hasMany(Image, {
      foreignKey: 'categoryId',
      sourceKey: 'id'
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories"
  }
);

export default Category;
