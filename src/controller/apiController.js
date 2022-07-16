import pool from "../configs/connectDB";

let getProject = async (rep, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT name, description, img, language, gitlink, codelink FROM project"
  );
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let getData = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT img, txt FROM data");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let getProfiles = async (rep, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT avatar , infor , txt FROM profile"
  );
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let getKnowledge = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT txt FROM know");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let getContact = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT img , link FROM contact");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let postMessage = async (rep, res) => {
  let { email, message, send_at } = rep.body;
  if (!email || !message || !send_at) {
    return res.status(404).json({
      message: "full fields",
    });
  } else {
    const [rows, fields] = await pool.execute(
      "INSERT INTO message(email, message, send_at) VALUES (?,?,?)",
      [email, message, send_at]
    );
    return res.status(200).json({
      message: "ok",
    });
  }
};

module.exports = {
  getProject,
  getData,
  getContact,
  getProfiles,
  getKnowledge,
  postMessage,
};
