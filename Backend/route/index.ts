import { Router } from "express";
import homeRouter from './home';
import userRouter from "./user";
import newsRouter from "./news";
import browseProductRouter from "./Product"
const router = Router();

router.use(homeRouter);
router.use(browseProductRouter);
router.use(newsRouter);
router.use("/", userRouter);
export default router;