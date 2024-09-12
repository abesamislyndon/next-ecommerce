import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Pagination from "../../components/products/pagination";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query; // Capture the dynamic part of the URL (slug)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products based on the category ID
  const fetchProducts = async (id) => {
    try {
      const response = await fetch(`/api/products?category_id=${id}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      setProducts(data.products || []); // Adjust according to your API response
      setTotalPages(data.totalPages || 1); // Adjust according to your API response
      setCurrentPage(data.currentPage || 1); // Adjust according to your API response
    } catch (error) {
   //   console.error("Failed to fetch products", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false); // Set loading to false once fetch is complete
    }
  };

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      if (!id) return; // Don't fetch if slug is not available

      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        // Fetch the category data by slug
        const categoryResponse = await fetch(`/api/products?category_id=${id}`);


        if (!categoryResponse.ok) throw new Error("Category not found");

        const categoryData = await categoryResponse.json();
        const categoryId = categoryData.id; // Assuming the response gives you the category ID

        // Now fetch the products for the category
        await fetchProducts(categoryId);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategoryAndProducts();
  }, [id]); // Fetch category and products whenever `slug` changes

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
