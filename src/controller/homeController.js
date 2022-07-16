import pool from "../configs/connectDB";
const appRoot = require("app-root-path");
let localhost = window.location.origin;
console.log(localhost);
let Project = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute(" SELECT * FROM `project`");
  data = rows;
  return res.render("index.ejs", {
    data,
  });
};
let createProject = async (rep, res) => {
  let { name, description, language, gitlink, codelink } = rep.body;
  let link = `${localhost}/img/${rep.file.originalname}`;
  await pool.execute(
    `INSERT INTO project(name,description, img, language, gitlink, codelink) VALUES (?,?,?,?,?, ?)`,
    [name, description, link, language, gitlink, codelink]
  );
  return res.redirect(`/`);
};
let deleteProject = async (rep, res) => {
  let projectID = rep.body.project_id;
  await pool.execute(`DELETE FROM project where ID= ?`, [projectID]);
  return res.redirect(`/`);
};
let Data = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute(" SELECT * FROM `data`");
  data = rows;
  return res.render("data.ejs", {
    data,
  });
};
let deleteData = async (rep, res) => {
  let dataID = rep.body.data_id;
  await pool.execute(`DELETE FROM data where ID= ?`, [dataID]);
  return res.redirect(`/data`);
};
let createData = async (rep, res) => {
  let txt = rep.body.txt;
  let link = `${localhost}/img/${rep.file.originalname}`;
  await pool.execute(`INSERT INTO data(img, txt) VALUES (?,?)`, [link, txt]);
  return res.redirect(`/data`);
};
let Profiles = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute("SELECT * FROM `profile`");
  data = rows;
  return res.render("profiles.ejs", {
    data: data[0],
  });
};
let updateProfiles = async (rep, res) => {
  let { infor, txt, profile_id } = rep.body;
  let avatar = `${localhost}/img/${rep.file.originalname}`;
  await pool.execute(
    `UPDATE profile SET avatar= ?, infor= ?, txt= ? WHERE ID= ?`,
    [avatar, infor, txt, profile_id]
  );
  return res.redirect(`/profile`);
};
let Contact = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute(" SELECT * FROM `contact`");
  data = rows;
  return res.render("contact.ejs", {
    data,
  });
};
let deleteContact = async (rep, res) => {
  let contactID = rep.body.contact_id;
  await pool.execute(`DELETE FROM contact where ID= ?`, [contactID]);
  return res.redirect(`/contact`);
};
let createContact = async (rep, res) => {
  let link = rep.body.link;
  let img = `${localhost}/img/${rep.file.originalname}`;
  await pool.execute(`INSERT INTO contact(img, link) VALUES (?,?)`, [
    img,
    link,
  ]);
  return res.redirect(`/contact`);
};
let Knowledge = async (rep, res) => {
  let data;
  const [rows, fields] = await pool.execute(" SELECT * FROM `know`");
  data = rows;
  return res.render("knowledge.ejs", {
    data,
  });
};
let deleteKnowledge = async (rep, res) => {
  let knowledgetID = rep.body.knowledge_id;
  await pool.execute(`DELETE FROM know where ID= ?`, [knowledgetID]);
  return res.redirect(`/knowledge`);
};
let createKnowledge = async (rep, res) => {
  let txt = rep.body.txt;
  await pool.execute(`INSERT INTO know(txt) VALUES (?)`, [txt]);
  return res.redirect(`/knowledge`);
};
let Message = async (rep, res) => {
  let data = await pool.execute(`SELECT * FROM message`);
  return res.render("message.ejs", { data });
};
module.exports = {
  Project,
  Data,
  Contact,
  Knowledge,
  Profiles,
  updateProfiles,
  createContact,
  createData,
  createProject,
  createKnowledge,
  deleteContact,
  deleteData,
  deleteKnowledge,
  deleteProject,
  Message,
};
