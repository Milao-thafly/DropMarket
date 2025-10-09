import { Router } from "express";
import globalRouter from './global';

const router = Router();

router.use(globalRouter);

export default router;