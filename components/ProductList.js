// components/ProductList.js
import ProductCard from "./ProductCard";

export default function ProductList({ products}) {
  if (!products || !products.data) {
    return (
      <>
        <div className="mx-auto w-1/1 mt-20">
          <span className="text-md font-extrabold mx-auto">No products available.</span>
        </div>
      </>
    );
  }
  return (
    <>
      <h3 className="text-xl font-extrabold mt-10 pl-4 lg:pl-0">New and exclusive</h3>
      <div className="grid grid-cols-2 p-5 gap-x-4 gap-1 pb-2 sm:grid-cols-3 sm:px-8 mt-1 lg:mt-0 lg:grid-cols-6 lg:gap-5 lg:px-0  ">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
