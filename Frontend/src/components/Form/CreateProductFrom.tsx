import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../Fetcher/BackendApiFetcher";


 interface Product {
  organe_id: number;
  organ_name: string;
  organ_type: string;
  description: string;
  price: string;
  blood_type: string;
  use_by_date: string;
  stock: string;
  category_id: number;
}
export default function ProductCreate(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        organe_id:"",
        organ_name: "",
        organ_type: "",
        description:"",
        price:"",
        blood_type: "",
        use_by_date: "",
        stock: "",
        category_id: "", 
    });
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState<Product[]>([]);
    
    const fetchProducts = async () => {
        try {
            const dataProduct = await apiFetch<Product[]>("/products", "GET")
            setProduct(dataProduct);
        }catch (err: any) {
            setMessage(err.message)
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { organ_name, value } = e.target;
        setFormData((prev) => ({ ...prev, [organ_name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const endpoint = isRegistering ? "/createProduct": 

        try {
            const response = await apiFetch<{token: string; product: Product; message?: string}>(
                "POST",
                formData
            )
        }
    }
}
