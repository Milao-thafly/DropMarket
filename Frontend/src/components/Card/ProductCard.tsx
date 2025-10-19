import   "./ProductCard.css"
import { Button } from "../Button/ProductButtonRead"
import type { ProductCardProps, ProductInfo, ProductListResponse, Product} from "../../../../Backend/models/Product"

export const ProductCard = ({ info, typeresult }: ProductCardProps<Product>) => {
  return (
    <div className="PPcard">
      <p className="title">{info.title}</p>
      <p className="description">{info.description}</p>

      <p className="price">{typeresult.price} €</p>
      <p className="blood">Type sanguin : {typeresult.blood_type}</p>

      <Button name="Interested ?" variant="primary" />
    </div>
  );
};
