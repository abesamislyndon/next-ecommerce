
import { useEffect, useState, lazy, Suspense } from "react"; 
import LoadingSpinner from "../components/loading/LoadingSpinner";


const ProductList = lazy(() => import("../components/ProductList"));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?page=1");
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data); // Adjust this according to your API response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg">
     
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList
            products={products}
          />
        </Suspense>
      )}
    </div>
  );
}