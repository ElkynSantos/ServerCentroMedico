import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB ?? "",
  {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,

    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
  }
);

export default db;
