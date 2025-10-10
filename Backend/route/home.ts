import { GlobalController } from "../controllers/GlobalController";
import { CreateNewsController } from "../controllers/GlobalController"
import { Router } from "express";


const homeRouter = Router();

homeRouter.get("/", (request, response) => {
    new GlobalController(request, response).homepage();
});

homeRouter.get("/createnews", (request, response) => {
    new CreateNewsController(request, response).showCreateNews();
});

homeRouter.post("/createnews", (request, response) => {
    new CreateNewsController(request, response).createNews();
});

export default homeRouter;
