import { useState } from 'react'
import { useEffect } from 'react';

const BASE_URL = "https://localhost:3000/"

    const [product, setProduct] = useState<any[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    export const browseProduct = async () => {
    try{
        const res = await fetch(`${BASE_URL}/${endpoint}http://localhost:3000/Product`)
        const BrowseDataProduct = await res.json();
        setProduct(BrowseDataProduct.result ?? [])
    } catch (err){
        setIsError(true);
    } finally {
        setIsLoading(false)
    }

    useEffect(() => {
        browseProduct();
    })

    return {product, isLoading, isError}
    
}  