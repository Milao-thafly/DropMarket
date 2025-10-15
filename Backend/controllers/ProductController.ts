import { Controller } from "../libs/Controller"
import { ProductRepository } from "../repository/ProductReposity";

export class CreateProductController extends Controller {
        public createProductRender() {
            this.response.json({
            data: ["http://localhost:3000/CreateProduct"],

        });
    }
}


export class BrowseProductController extends Controller {
        private repo = new ProductRepository;

        public async browseProductRender() {

            const product = await this.repo.getAll();
            this.response.json(product)
        console.log(this.response)
    }
}
