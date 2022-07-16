import mysql from "mysql2/promise";
require("dotenv").config();

const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b431712a43860e",
  password: "29e94d9e",
  database: "heroku_7d87b189b71c1d9",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default pool;
