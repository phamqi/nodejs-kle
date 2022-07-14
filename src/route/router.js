import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";

const appRoot = require("app-root-path");
let router = express.Router();

const imageFilter = function (rep, file, cb) {
  if (!file.originalname.match(/\.(img|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    rep.fileValidationError = "Only image files";
    return cb(new Error("Only image files"), false);
  }
  cb(null, true);
};
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
  router.get("/", homeController.getHomePage);
  router.get("/user/details/:user", homeController.getUserDetailsPage);
  router.post("/user/create", homeController.createUser);
  router.post("/delete", homeController.deleteUser);
  router.post("/user/details/update", homeController.updateUser);
  router.get("/upload", homeController.getUploadfile);
  app.post(
    "/profile",
    upload.single("avatar"),
    homeController.handleUploadFiles
  );
  router.get("/about", (rep, res) => {
    console.log("alo alo");
  });
  return app.use("/", router);
};
export default innitWebRouter;
