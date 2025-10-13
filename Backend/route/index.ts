import { Router } from "express";
import homeRouter from './home';
import userRouter from "./user";

const router = Router();

router.use(homeRouter);
router.use("/", userRouter);
export default router;