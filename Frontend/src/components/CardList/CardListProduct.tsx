import "./CardListProduct.css"
import { ProductCard } from "../Card/ProductCard"
import { apiFetch } from "../Fetcher/BackendApiFetcher"
import { useEffect, useState } from "react"
import type { ProductCardProps, Product, ProductListResponse } from "../../../../Backend/models/Product"


export const  CardListProduct =  () => {

    const [message, setMessage] = useState("");
    const [data, setData] = useState<ProductListResponse | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await apiFetch<Product[]>("browseProduct", "GET");
                const wrappedData: ProductListResponse = {
                info: {
                    title: "Liste des organes",
                    description:"lol",
                },
           products,
        };

        setData(wrappedData)

            console.log(wrappedData)
            } catch (err: any) {
                setMessage(err.message)
            } 
        }
        fetchProduct();
    
    }, []);

    
    if (message) {
        return <p>{message}</p>;
    }

    if (!data) {
        return <p>Chargement...</p>;
    }
    



    return (
        <>
        <h2>Organ</h2>
            <div className="ProductBrowsed">
                <ul className="List">
                    {data.products.map((product) => {
                        return(
                        <li key={product.organe_id}>
                            <ProductCard 
                                info={{
                                    title: product.organ_name,
                                    description: product.description
                                    }}
                                typeresult={product}
                            /> 
                        </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}