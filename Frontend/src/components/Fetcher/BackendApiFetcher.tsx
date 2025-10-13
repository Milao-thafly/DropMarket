import { useState } from 'react'
import { useEffect } from 'react';

const BASE_URL = "https://localhost:3000/"



    export const BrowseProduct = async ({endpoint}: {endpoint:string}) => {

            const [product, setProduct] = useState<any[]>([]);
            const [isError, setIsError] = useState<boolean>(false);
            const [isLoading, setIsLoading] = useState<boolean>(false)


            const FetchBrowseProduct = async ()=> {
                try{
            const res = await fetch(`${BASE_URL}${endpoint}`)
            const BrowseDataProduct = await res.json();
            setProduct(BrowseDataProduct.result ?? [])

    } catch (err){
        setIsError(true);
    } finally {
        setIsLoading(false)
    }
}

    useEffect(() => {
        FetchBrowseProduct();
    })

    return {product, isLoading, isError}
    
}  