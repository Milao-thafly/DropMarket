import { Controller } from "../libs/Controller";
import { OrganRepository } from '../repository/OrganRepository';
import { Organ } from '../models/Organ';

export class GlobalController extends Controller {
  public async homepage() {
    try {
      const OrganrganRepository = new OrganRepository();
      const organs = await OrganRepository.findInStock();

      this.response.status(200).json({
        message: "Produits disponibles",
        data: organs,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);  
      this.response.status(500).json({
        message: "Erreur interne du serveur",
      });
    }
  }
}

export class CreateNewsController extends Controller {
  public showCreateNews() {
    this.response.json({
      message: "AAAAAAAAAAAAAAH",
      data: [],
    });
  }
  public createNews() {}
}
