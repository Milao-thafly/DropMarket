import { Router } from "express";
import homeRouter from './home';
import userRouter from "./user";
import browseProductRouter from "./product"
const router = Router();

router.use(homeRouter);
router.use(browseProductRouter);
router.use("/", userRouter);
export default router;