import mysql from "mysql2/promise";
require("dotenv").config();

const host = process.env.LOCALHOST;
const database = process.env.DATABASEE;
const user = process.env.USER;
const psw = process.env.psw;
const pool = mysql.createPool({
  host: `${host}`,
  user: `${user}`,
  password: `${psw}`,
  database: `${database}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default pool;
