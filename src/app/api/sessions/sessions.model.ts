import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../database/postgres/postgres.db";
import User from "../users/users.model";

interface SessionAttributes {
  id: number;
  userId: number;
  expiresIn: string;
  deviceType: string;
  status: string;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, "id"> {}

class Session
  extends Model<SessionAttributes, SessionCreationAttributes>
  implements SessionAttributes
{
  public id!: number;
  public userId!: number;
  public expiresIn!: string;
  public deviceType!: string;
  public status!: string;
  // You can add any custom methods or static properties here if needed

  // This static method will define associations with other models
  public static associate(models: any) {
    // Define associations here if needed
    Session.belongsTo(User, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
    expiresIn: DataTypes.TIME,
    deviceType: DataTypes.STRING,
    status: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

export default Session;
