// database.js

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize("AdManagementDev", "postgres", "myPassword", {
  host: "myPostgres",
  dialect: "postgres",
  // port: Number(process.env.SQL_PORT),
});

export { sequelize };
