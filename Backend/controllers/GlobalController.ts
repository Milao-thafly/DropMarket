import { Controller } from "../libs/Controller";
import { ProductRepository } from "../repository/ProductReposity";

export class GlobalController extends Controller {
  public async homepage() {
    try {
      const productRepo = new ProductRepository();
      const products = await productRepo.findInStock();

      this.response.status(200).json({
        message: "Produits disponibles récupérés avec succès",
        data: products,
      });
    } catch (error) {
      console.error("Erreur homepage", error);
      this.response
        .status(500)
        .json({ message: "Erreur interne du serveur" });
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
