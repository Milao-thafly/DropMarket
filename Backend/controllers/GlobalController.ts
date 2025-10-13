import { Controller } from "../libs/Controller";
import { OrganRepository } from '../repository/OrganRepository';
import { Organ } from '../models/Organ';

export class GlobalController extends Controller {
  public homepage() {
    this.response.json({
      message: "Voici votre rendu react de la homepage",
      data: ["http://localhost:3000/data.json"],
    });
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
