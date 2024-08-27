import { useState } from "react";
import Image from "next/image";
import Pork from "../../public/image/pig.png";
import Beef from "../../public/image/beef.png";
import Chicken from "../../public/image/chicken.png";
import Marinated from "../../public/image/marinated.png";
import All from "../../public/image/all.png";
import Link from "next/link";

const Categories = ({ categories }) => {
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

  if (!categories || !categories.data) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <span className="text-center text-lg lg:text-left lg:text-lg -mb-2">Categories</span>
      <div className="grid grid-cols-3 gap-10  pb-1 sm:grid-cols-3 sm:p-1 mt-0 lg:mt-1 lg:grid-cols-5 lg:gap-x-4 lg:px-0 p-12 text-center">
        {categories.data.map((category) => (
          <div
            key={category.id}
            className="w-full  lg:w-3/4 bg-white p-5 mt-1 shadow-sm round transition-colors ease-linear duration-600  hover:bg-gradient-to-r from-[#FFD950] to-[#ffe37d]"
          >
            <Link href={`category/${category.id}`} passHref>
              {category.name === "Pork" ? (
                <>
                  <Image src={Pork} className="w-20 mx-auto" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Beef" ? (
                <>
                  <Image src={Beef} className="w-20 mx-auto" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Chicken" ? (
                <>
                  <Image src={Chicken} className="w-20 mx-auto" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Imerich templado" ? (
                <>
                  <Image src={Marinated} className="w-20 mx-auto" />
                  <span className=" text-center lg:text-1xl">
                    <p className="text-[10px] mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : (
                <>
                  <Image src={All} className="w-20 mx-auto" />
                  <span className="text-1xl">All</span>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
