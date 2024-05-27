// components/ProductList.js
import ProductCard from "./ProductCard";

export default function ProductList({ products}) {


  if (!products || !products.data) {
    return <p>No products available.</p>;
  }
  //console.log(products);
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-1-10 px-3 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-1 lg:grid-cols-4 lg:gap-x-10 lg:px-0">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  );
}
