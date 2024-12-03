import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   host: process.env.DB_HOST || "db",
   timezone: "-03:00", // Fuso horário de Brasília (GMT-3)
   dialect: "mysql",
};

export = config;
