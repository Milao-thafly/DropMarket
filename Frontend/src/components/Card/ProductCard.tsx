import { ProductCard } from "./ProductCard.css";
import { Button } from "../Button/ProductButtonRead";

interface ProductCardProps {
  title: string;
  overview: string;
}
interface ProductInfo {
  title: string;
  overview: string;
  posterUrl: string;
}
export const Card = (results: ProductInfo) => {
  return (
    <>
      <div className="card">
        <p className="title">{results.title} </p>
        {/* <p>{results.overview} </p> */}

        <div>
          <Button
            name="Paye ton putain de film"
            variant="primary"
            disabled={true}
          />
        </div>
      </div>
    </>
  );
};
