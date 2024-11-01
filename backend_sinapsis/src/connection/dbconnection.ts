import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db_host: string = process.env.DB_HOST || "localhost";
const db_name: string = process.env.DB_NAME || "";
const db_user: string = process.env.DB_USER || "";
const db_pass: string = process.env.DB_PASS || "";

export const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: "mysql",
  define: {
    timestamps: false,
    underscored: false,
  },
  logging: false,
});
