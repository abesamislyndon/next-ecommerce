// components/ProductList.js
import ProductCard from "./ProductCard";

export default function ProductList({ products}) {
  if (!products || !products.data) {
    return <p>No products available.</p>;
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-1-10 pb-2 sm:grid-cols-3 sm:px-8 mt-1 lg:mt-0 lg:grid-cols-6 lg:gap-x-4 lg:px-0  p-12">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  );
}
