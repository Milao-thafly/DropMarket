import { useState, useEffect } from 'react'
import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher"
import type { ProductCardProps, Product } from "../../Backend/models/Product"
import {CardListProduct}  from "../src/components/CardList/CardListProduct"
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"


export default function CreateProductPage() {


    return(
        <>
        <Header />
        
        <Footer />
        </>
    )
}