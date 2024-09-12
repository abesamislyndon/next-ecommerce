import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Pagination from "../../components/products/pagination";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query; // Capture the dynamic part of the URL (id)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products based on the category ID and current page
  const fetchProducts = async (categoryId, page) => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching

      const response = await fetch(
        `/api/products?category_id=${categoryId}&page=${page}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      

      const data = await response.json();
      console.log("iyahang response", data);

      setProducts(data || []); // Adjust according to your API response
      setTotalPages(data.totalPages || 1); // Adjust according to your API response
      setCurrentPage(data.currentPage || 1); // Adjust according to your API response
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false); // Set loading to false once fetch is complete
    }
  };

  useEffect(() => {
    if (!id) return; // Don't fetch if id is not available

    fetchProducts(id, currentPage);
  }, [id, currentPage]); // Fetch products whenever `id` or `currentPage` changes

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
