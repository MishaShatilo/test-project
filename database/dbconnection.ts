import { Sequelize } from "sequelize-typescript";
import { env } from "../config";
import { Token } from "../models/token";
import { User2 } from "../models/users";
import { Video } from "../models/video";

require("dotenv").config();
export const sequelize = new Sequelize({
  database: env.database,
  dialect: "mysql",
  username: "root",
  password: env.pass,
  storage: ":memory:",
  models: [User2, Token, Video],
});
