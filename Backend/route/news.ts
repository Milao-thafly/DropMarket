import { Router } from "express";
import { NewsController } from "../controllers/NewsController";

const newsRouter = Router();

newsRouter.get("/news", (request, response) => {
    new NewsController(request, response).getAllNews();
});

export default newsRouter;