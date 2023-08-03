import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import { serve, setup } from "swagger-ui-express";
import { SWAGGER_OPTIONS } from "./constants/constants";
import swaggerJSDoc from "swagger-jsdoc";
import { createClient } from "redis";
import { appRoutes } from "./api/api.routes";
import { sequelize } from "./database/postgres/postgres.db";

dotenv.config();
let connectionData: any = {
  port: process.env.REDIS_PORT,
  host: "myRedis",
  index: 0,
  password: "myPassword",
};

//Base class
class App {
  public client = createClient(connectionData);
  private app: Express = express();
  private port: any = process.env.PORT || 3000;
  private hostname = process.env.HOST || "localhost";

  constructor() {
    console.log({ port: this.port });
    console.log({ host: this.hostname });
    this.startApp();
  }

  private startApp() {
    this.app = express();
    this.loadGlobalMiddlewares();
    this.connectToDatabases();
    this.connectRedis();
    this.loadRoutes();
    this.initialiseServer();
  }

  private loadGlobalMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    const adMgmntAPISpecs = swaggerJSDoc(SWAGGER_OPTIONS);
    this.app.use(`/v1/api-docs`, serve, setup(adMgmntAPISpecs));
  }

  private initialiseServer() {
    this.app.listen(this.port, this.hostname, () => {
      console.log(
        `[server]: The server is running at http://${this.hostname}:${this.port}`
      );
    });
  }

  private loadRoutes() {
    this.app.use("/api/v1", appRoutes.loadRoutes());
  }

  private async connectToDatabases() {
    try {
      await sequelize.authenticate();
      // sequelize.sync();
    } catch (error) {
      console.error("SQL connection error:", error);
    }
  }

  private async connectRedis() {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
    console.log("REDIS CONNECTED");
  }
}

export const bootstrap = new App();
