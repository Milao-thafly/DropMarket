import { useState, useEffect } from 'react'
import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher"
import type { ProductCardProps, Product } from "../../Backend/models/Product"
import {CardListProduct}  from "../src/components/CardList/CardListProduct"


export default function ProductPage() {


    return(

        <>
        <CardListProduct/>
        </>
    )
}