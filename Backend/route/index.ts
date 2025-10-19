import { Router } from "express";
import homeRouter from './home';
import userRouter from "./user";
import browseProductRouter from "./Product"
const router = Router();

router.use(homeRouter);
router.use(browseProductRouter);
router.use("/", userRouter);
export default router;