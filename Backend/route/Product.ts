import { CreateProductController } from "../controllers/ProductController";
import { BrowseProductController } from "../controllers/ProductController";
import { Router } from "express";


const createProductRouter = Router();
const browseProductRouter = Router();



createProductRouter.get("/createProduct", (request, response) => {
    const createProductControl = new CreateProductController(request, response);
    createProductControl.createProductRender()
})



browseProductRouter.get("/browseProduct", (request, response) => {
    const createProductControl = new BrowseProductController(request, response);
    createProductControl.browseProductRender()
})



export default createProductRouter;