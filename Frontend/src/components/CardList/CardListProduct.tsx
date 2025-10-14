import "./CardList.css";
import { ProductCard } from "../Card/ProductCard";
import { GlobalFetch } from "../Fetcher/BackendApiFetcher";
import { ProductCardProps, ProductInfo} from "../../../../Backend/models/Product"
export const CardList = () => {
    const productList = GlobalFetch<ProductInfo<Product[]>>("/")


    return (
        <>
        <h2> Organs </h2>

            <div className="browseProduct">

                <ul className="ProductList">
                    {productList.products.map((organ) => {
                        return(
                            <li key={organ.id}>
                                <ProductCard
                                title={organ.title}
                                description={organ.description}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        
        </>
    )
}

