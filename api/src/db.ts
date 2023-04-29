import { Sequelize } from "sequelize-typescript";
import config from "../lib/config";
config;
export const sequelize = new Sequelize({
  dialect: "postgres",
  database: config.dbName,
  password: config.dbPassword,
  username: config.dbUser,
  port: Number(config.dbPort),
  storage: ":memory:",
  models: [__dirname + "/models"],
});
