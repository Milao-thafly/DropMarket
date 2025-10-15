import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => {
  const controller = new UserController(req, res);
  await controller.getAll();
});

userRouter.post("/users", async (req, res) => {
  const controller = new UserController(req, res);
  await controller.create();
});

userRouter.post("/login", async (req, res) => {
  const controller = new UserController(req, res);
  await controller.login();
});

userRouter.post("/register", async (req, res) => {
  const controller = new UserController(req, res);
  await controller.register();
});

export default userRouter;
