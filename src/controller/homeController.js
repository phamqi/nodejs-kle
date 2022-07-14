import pool from "../configs/connectDB";
const appRoot = require("app-root-path");
let getHomePage = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute("SELECT * FROM `user`");
  data = rows;
  return res.render("index.ejs", {
    data,
  });
};
let getUserDetailsPage = async (rep, res) => {
  let userID = rep.params.user;
  const [userDetails, fields] = await pool.execute(
    `SELECT * FROM user where ID=${userID}`
  );
  return res.render("user.ejs", {
    data: userDetails[0],
  });
};
let createUser = async (rep, res) => {
  let { fullName, password, email } = rep.body;
  await pool.execute(
    `INSERT INTO user(fullName,password, email, OTP, setting) VALUES (?,?,?,?,?)`,
    [fullName, password, email, "12345", "none"]
  );
  return res.send(`create new user is successfully`);
};

let deleteUser = async (rep, res) => {
  let userID = rep.body.user;
  await pool.execute(`DELETE FROM user where ID= ?`, [userID]);
  return res.send("delete is successfully");
};
let updateUser = async (rep, res) => {
  let { fullName, password, email, ID } = rep.body;
  await pool.execute(
    `UPDATE user SET fullName= ?, password= ?, email= ? WHERE ID= ?`,
    [fullName, password, email, ID]
  );
  return res.redirect(`/user/details/${ID}`);
};
let getUploadfile = async (rep, res) => {
  return res.render("upload.ejs");
};

let handleUploadFiles = async (rep, res) => {
  let link = `${appRoot}/src/public/img/${rep.file.originalname}`;
  await pool.execute(`INSERT INTO data( img, txt) VALUES (?,?)`, [
    link,
    "none",
  ]);
  return res.send(`${appRoot}/src/public/img/${rep.file.originalname}`);
};
module.exports = {
  getHomePage,
  getUserDetailsPage,
  createUser,
  deleteUser,
  updateUser,
  getUploadfile,
  handleUploadFiles,
};
