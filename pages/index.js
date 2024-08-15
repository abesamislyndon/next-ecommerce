import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import Search from "../components/search";
import Pagination from "../components/products/pagination";
import { searchProducts } from "../features/cart/cartSlice";

const ProductList = lazy(() => import("../components/ProductList"));

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cache = useRef({});

  useEffect(() => {
    async function fetchProducts(page) {
      if (cache.current[page]) {
        // If data is in cache, use it
        setProducts(cache.current[page].products);
        setTotalPages(cache.current[page].totalPages);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/products?limit=8&page=${page}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const data = await res.json();
        // console.log("API Response:", data.meta); // Check API response

        const productsData = data || [];
        const totalPages = data.meta.last_page || 1;

        // Cache the data
        cache.current[page] = { products: productsData, totalPages };

        setProducts(productsData);
        setTotalPages(totalPages);
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


      useEffect(() => {
        dispatch(searchProducts({ query: "" })); // Fetch initial products
      }, [dispatch]);

      useEffect(() => {
        if (currentPage > 1) {
          dispatch(searchProducts({ query: "", page: currentPage }));
        }
      }, [currentPage, dispatch]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const cacheKey = `search-${query}`;

      // Check if the search results are already cached
      if (cache.current[cacheKey]) {
        setProducts(cache.current[cacheKey].products);
        setTotalPages(cache.current[cacheKey].totalPages);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/products?name=${query}&limit=10&page=1`);
      if (!res.ok) {
        throw new Error(`Failed to fetch search results: ${res.statusText}`);
      }

      const data = await res.json();
      const productsData = data || [];
      const totalPages = data.meta?.last_page || 1;

      // Cache the search results
      cache.current[cacheKey] = { products: productsData, totalPages };

      // Update state with search results
      setProducts(productsData);
      setTotalPages(totalPages);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl p-2">
      <Search onSearch={handleSearch} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList products={products} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
