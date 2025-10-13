import { Controller } from "../libs/Controller";
import { ProductRepository } from "../repository/ProductReposity";

export class GlobalController extends Controller {
  public async homepage() {
    try {
      const productRepo = new ProductRepository();
      const products = await productRepo.getAllInStock();
      this.response.status(200).json({
        message: "Produits disponibles récupérés avec succès",
        data: products
      });
    } catch (error) {
      console.error("Erreur homepage", error);
      this.response.status(500).json({ message: "Erreur interne du serveur"});
    }
  }
}

// export class GlobalController extends Controller {
//   public homepage() {
//     this.response.json({
//       message: "Voici votre rendu react de la homepage",
//       data: ["http://localhost:3000/data.json"],
//     });
//   }
// }

export class CreateNewsController extends Controller {
  public showCreateNews() {
    this.response.json({
      message: "AAAAAAAAAAAAAAH",
      data: [],
    });
  }
  public createNews() {}
}
