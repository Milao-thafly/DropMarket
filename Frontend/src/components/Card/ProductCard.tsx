import   "./ProductCard.css"
import { Button } from "../Button/ProductButtonRead"
import type { ProductCardProps, ProductInfo, ProductListResponse, Product} from "../../../../Backend/models/Product"


export const ProductCard = ({info}: ProductCardProps<Product[]>) => {
    return (
    
        <>
            <div className="card">
            <p className="title">{info.title} </p>
            <p className="description">{info.description}</p>
            
            <div>
            <Button
                name = "Interested ?"
                variant="primary"

                 />
            </div>
            
        </div>
      
    </>
  );
};
