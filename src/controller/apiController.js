import pool from "../configs/connectDB";

let getAllUser = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createUser = async (rep, res) => {
  let { fullName, password, email } = rep.body;
  console.log(rep.body);
  if (!fullName || !password || !email) {
    return res.status(403).json({
      message: "missing some fields",
    });
  } else {
    await pool.execute(
      `INSERT INTO user(fullName,password, email, OTP, setting) VALUES (?,?,?,?,?)`,
      [fullName, password, email, "12345", "none"]
    );
    return res.status(200).json({
      message: "ok",
    });
  }
};
let updateUser = async (rep, res) => {
  let { fullName, password, email, ID } = rep.body;
  console.log(rep.body);
  if (!fullName || !password || !email || !ID) {
    return res.status(403).json({
      message: "missing some fields",
    });
  } else {
    await pool.execute(
      `UPDATE user SET fullName= ?, password= ?, email= ? WHERE ID= ?`,
      [fullName, password, email, ID]
    );
    return res.status(200).json({
      message: "ok",
    });
  }
};

let deleteUser = async (rep, res) => {
  let userID = rep.params.id;
  if (!userID) {
    return res.status(403).json({
      message: "ID not found",
    });
  }
  await pool.execute(`DELETE FROM user where ID= ?`, [userID]);
  return res.status(200).json({
    message: "ok",
  });
};
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
