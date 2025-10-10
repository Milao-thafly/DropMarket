import { Controller } from "../libs/Controller";

export class GlobalController extends Controller {
  public homepage() {
    this.response.json({
      message: "AAAAAAAAAAAAAAH",
      data: [],
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
