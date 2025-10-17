import { useEffect, useState } from "react";
import { apiFetch } from "../src/components/Fetcher/userfetcher";

interface Product {
  organe_id: number;
  organ_name: string;
  description: string;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiFetch<{ message: string; data: Product[] }>(
          "/"
        );
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Erreur");
        }
      }
    };

    fetchProducts();
  }, []);

  if (error) return <p style={{ color: "red" }}>Erreur: {error}</p>;

  return (
    <section>
      <
    </section>
  );
}

