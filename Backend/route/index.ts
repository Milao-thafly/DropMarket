import { Router } from "express";
import homeRouter from './home';
// import panierRouter from './panier'; 

const router = Router();

router.use(homeRouter);
// app.use('/api/panier', panierRouter); 


export default router;