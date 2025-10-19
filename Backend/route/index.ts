import { Router } from "express";
import homeRouter from './home';
import userRouter from "./user";
import { browseProductRouter, createProductRouter}  from "./Product"
const router = Router();

router.use(homeRouter);
router.use(browseProductRouter);
router.use(createProductRouter);

router.use("/", userRouter);
export default router;