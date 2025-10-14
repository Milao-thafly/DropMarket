import   "./ProductCard.css"
import { Button } from "../Button/ProductButtonRead"
import { ProductCardProps, ProductInfo} from "../../../../Backend/models/Product"


export const ProductCard = (results: ProductInfo) => {
    return (
    
        <>
            <div className="card">
            <p className="title">{results.title} </p>
            
            <div>
            <Button
                name = "Interested ?"
                variant="primary"

                 />
            </div>
            
        </div>
    

    
        </>
   
    )
}