import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";

const appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const innitWebRouter = (app) => {
  router.get("/", homeController.Project);
  router.post(
    "/project-create",
    upload.single("img"),
    homeController.createProject
  );
  router.post("/project-delete", homeController.deleteProject);
  router.get("/data", homeController.Data);
  router.post(
    "/data/data-create",
    upload.single("img"),
    homeController.createData
  );
  router.post("/data/data-delete", homeController.deleteData);
  router.get("/profile", homeController.Profiles);
  router.post(
    "/profile/profile-update",
    upload.single("avatar"),
    homeController.updateProfiles
  );
  router.get("/contact", homeController.Contact);
  router.post(
    "/contact/contact-create",
    upload.single("img"),
    homeController.createContact
  );
  router.post("/contact/contact-delete", homeController.deleteContact);
  router.get("/knowledge", homeController.Knowledge);
  router.post("/knowledge/knowledge-create", homeController.createKnowledge);
  router.post("/knowledge/knowledge-delete", homeController.deleteKnowledge);
  router.get("/message", homeController.Message);
  return app.use("/", router);
};
export default innitWebRouter;
