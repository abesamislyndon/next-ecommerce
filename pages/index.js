import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import Search from "../components/search";
import Pagination from "../components/products/pagination";
import { searchProducts } from "../features/cart/cartSlice";
import Categories from "../components/categories";
import { EmblaCarousel } from "./carousell";

const ProductList = lazy(() => import("../components/ProductList"));

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
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
        const res = await fetch(`/api/products?limit=12&page=${page}`);
        if (!res.ok) {
          throw new Error(`Unable to Load Data`);
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

  useEffect(() => {
    async function fetchCategories(page) {
      setLoading(true);
      try {
        const res = await fetch(`/api/categories?page=${page}`);
        if (!res.ok) {
          throw new Error(`Unable to Load Data`);
        }
        const data = await res.json();
        const categoriesData = data || [];
        setCategories(categoriesData);
        // setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories(currentPage);
  }, []);

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
        throw new Error(`Unable to Load Data`);
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
    <>
      <div className="mx-auto max-w-screen-2xl p-1 lg:p-10">
        <Search onSearch={handleSearch} />
        <p className="mt-7 text-[35px] lg:text-[45px] p-2 lg:p-0 text-center">
          We offer convenience.  MEAT your happiness!
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 pl-3 pr-3 bg-white">
          <div className="col-span-1 lg:col-span-2">
            <EmblaCarousel className="w-full" />
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-extrabold mt-1">Categories</h3>
            <Categories categories={categories} />
          </div>
        </div>

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
 
    </>
  );
}
