import { useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(`/api/products?category_id=${categoryId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
