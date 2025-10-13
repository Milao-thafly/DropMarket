import { Controller } from "../libs/Controller"

export class CreateProductController extends Controller {
        public createProductRender() {
            this.response.json({
            data: ["http://localhost:3000/CreateProduct"],

        });
    }
}


export class BrowseProductController extends Controller {
        public browseProductRender() {
            this.response.json({
            data: ["http://localhost:3000/Product"],
            
        })
        console.log(this.response)
    }
}
