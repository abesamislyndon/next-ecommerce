import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Pagination from "../../components/products/pagination";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return; // Don't fetch if ID is not available

      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(`/api/products?category_id=${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Log the data to inspect its format
        console.log("API response:", data);

        // Ensure data contains the expected properties
        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected response format");
        }

        setProducts(data);
        setTotalPages(data.totalPages || 1); // Assuming your API provides totalPages
        setCurrentPage(data.currentPage || 1); // Assuming your API provides currentPage
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchProducts();
  }, [id]); // Fetch products whenever `id` changes

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mx-auto max-w-screen-xl p-2">
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)} // Example for handling page changes
      />
    </div>
  );
}
