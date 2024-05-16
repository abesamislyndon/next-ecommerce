// pages/categories/[id].js
import { useRouter } from "next/router";
import ProductList from "../../components/ProductList";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const products = [
  
    {
      id: "1",
      name: "Salmon Fillet | 200g - 250g",
      price: "$10",
      category: "1",
    },
    {
      id: "2",
      name: "Tenggiri Steak | 200g - 250g",
      price: "$20",
      category: "2",
    },
    {
      id: "3",
      name: "Spotted Mackerel Whole | 3.5 kg - 4 kg",
      price: "$30",
      category: "2",
    },
  ];

  const filteredProducts = products.filter(
    (product) => product.category === id
  );

  return (
    <div>
      <h1>Category {id}</h1>
      <ProductList products={filteredProducts} />
    </div>
  );
}
