import { Controller } from "../libs/Controller";
import { NewsRepository } from "../repository/NewsRepository";

export class NewsController extends Controller {
    private repo = new NewsRepository();

    public async getAllNews() {
        try {
            const news = await this.repo.getAll();
            this.response.status(200).json({
                message: "News récupérées avec succès",
                data: news,
            });
        } catch (error) {
            console.error("Erreur getAllNews", error);
            this.response.status(500).json({
                message: "Erreur interne du serveur"
            });
        }
    }
}