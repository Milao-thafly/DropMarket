import { useEffect, useState } from "react";
import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import { NewsCarousel } from "../src/components/Carousel/NewsCarousel";
import "./HomePage.css";


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
    <section className="homepage">
      <Header />
      <div className="carousel-section">
      <NewsCarousel />
      </div>
      {/* <div className="products_container">
        <h2 className="products-title">Produits Disponible</h2>
        <div className="products_grid">
          {products.length > 0 ? (products.map((p)))}
        </div>
      </div> */}
    </section>

  );
}

    /* <div>
      <h2>Produits Disponible</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.organe_id}
              style={{
                border: "1px solid grey",
                padding: "1rem",
                width: "200px",
              }}
            >
              <h3>{p.organ_name}</h3>
              <p>{p.description}</p>
              <strong>{p.price}€</strong>
            </div>
          ))
        ) : (
          <p>Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </div> */

    /* Frontend/views/HomePage.css */