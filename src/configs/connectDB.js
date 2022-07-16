import mysql from "mysql2/promise";
require("dotenv").config();

const host = process.env.LOCALHOST;
const pool = mysql.createPool({
  host: `${host}`,
  user: "root",
  database: "my_portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default pool;
