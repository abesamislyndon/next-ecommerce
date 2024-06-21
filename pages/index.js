import { useEffect, useState, lazy, Suspense } from "react";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import Search from "../components/search";

const ProductList = lazy(() => import("../components/ProductList"));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts(page) {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?limit=10&page=${page}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const data = await res.json();
        // console.log("API Response:", data.meta); // Add this line to check API response

        setProducts(data || []);
        setTotalPages(data.meta.last_page || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto max-w-screen-lg">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <Search />
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Suspense>
      )}
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 border ${
            currentPage === page ? "bg-gray-300" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
