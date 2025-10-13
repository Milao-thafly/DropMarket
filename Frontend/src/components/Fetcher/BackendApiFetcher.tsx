import { useState } from 'react'
import { useEffect } from 'react';

    const BASE_URL = "https://localhost:3000/"
        export const GlobalFetch = async ({endpoint}: {endpoint:string}) => {

                    const [product, setProduct] = useState<any[]>([]);
                    const [isError, setIsError] = useState<boolean>(false);
                    const [isLoading, setIsLoading] = useState<boolean>(false)

            useEffect(() => {
                const fetchData = async ()=> {

                    try{
                        const res = await fetch(`${BASE_URL}${endpoint}`)
                        const BrowseDataProduct = await res.json();


                        setProduct(BrowseDataProduct.result ?? [])

                    } catch (err){
                    setIsError(true);
                    } finally {
                    setIsLoading(false)
                    }
            };
            fetchData();

            }, [endpoint]);
                


    return {product, isLoading, isError}
    
}  