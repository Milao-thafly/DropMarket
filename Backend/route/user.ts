import { UserController } from "../controllers/UserController.js";
import { User } from "../models/User.js";
import { Router } from "express";

const router = Router();
const controller = new UserController();


router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;

