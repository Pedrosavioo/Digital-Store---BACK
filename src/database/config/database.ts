import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   host: process.env.DB_HOST || "db",
   dialect: "mysql",
};

export = config;
