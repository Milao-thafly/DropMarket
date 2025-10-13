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


const API_URL = "http://localhost:3000";

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiFetch<T>(
  endpoint: string,
  method: FetchMethod = "GET",
  body?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erreur serveur");
  }

  return response.json();
}


