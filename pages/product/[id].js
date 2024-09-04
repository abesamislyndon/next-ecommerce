// pages/product/[id].js
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const products = [
    { id: "1", name: "Product 1", price: "$10" },
    { id: "2", name: "Product 2", price: "$20" },
    { id: "3", name: "Product 3", price: "$30" },
  ];

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <div className="mx-auto container p-10 bg-white">
        <span className="text-center">No products available</span>
         </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
      </div>
    </>
  );
}
