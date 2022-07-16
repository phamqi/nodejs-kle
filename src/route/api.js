import express from "express";
import apiController from "../controller/apiController";

let router = express.Router();

const innitApiRouter = (app) => {
  router.get("/get-product", apiController.getProject);
  router.get("/get-data", apiController.getData);
  router.get("/get-profiles", apiController.getProfiles);
  router.get("/get-contact", apiController.getContact);
  router.get("/get-knowledge", apiController.getKnowledge);
  router.post("/post-message", apiController.postMessage);
  return app.use("/api/v1/", router);
};
export default innitApiRouter;
