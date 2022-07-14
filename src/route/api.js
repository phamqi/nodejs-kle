import express from "express";
import apiController from "../controller/apiController";

let router = express.Router();

const innitApiRouter = (app) => {
  router.get("/user", apiController.getAllUser);
  router.post("/create-user", apiController.createUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user/:id", apiController.deleteUser);
  return app.use("/", router);
};
export default innitApiRouter;
