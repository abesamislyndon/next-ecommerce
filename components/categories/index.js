import { useState } from "react";
import Image from "next/image";
import Pork from "../../public/image/pig.png";
import Beef from "../../public/image/beef.png";
import Chicken from "../../public/image/chicken.png";
import Marinated from "../../public/image/marinated.png";
import All from "../../public/image/all.png";
import Link from "next/link";
import LoadingSpinner from "../loading/LoadingSpinner";

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
    return (
      <>
        <p className="m-auto">Loading ...</p>
      </>
    );
  }
  return (
    <>
      <div className="mx-auto grid grid-cols-3 gap-1  pb-1 sm:grid-cols-3 sm:p-1 mt-0 lg:mt-1 lg:grid-cols-5 lg:gap-x-3 lg:px-0  text-center">
        {categories.data.map((category) => (
          <div
            key={category.id}
            className="w-3/4 p-5 mt-1 shadow-sm m-5 transition-colors ease-linear duration-600  hover:bg-gradient-to-r from-[#FFD950] to-[#ffe37d]  rounded-2xl"
          >
            <Link href={`category/${category.id}`}>
              {category.name === "Pork" ? (
                <>
                  <Image src={Pork} className="w-20 mx-auto mt-10" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Beef" ? (
                <>
                  <Image src={Beef} className="w-20 mx-auto mt-10" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Chicken" ? (
                <>
                  <Image src={Chicken} className="w-20 mx-auto mt-10" />
                  <span className="text-xs lg:text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Imerich templado" ? (
                <>
                  <Image src={Marinated} className="w-20 mx-auto mt-10" />
                  <span className=" text-center lg:text-1xl">
                    <p className="text-[10px] mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : (
                <>
                  <Image src={All} className="w-20 mx-auto mt-10" />
                  <p className="text-[10px] mt-2 text-rose-950 font-bold"> {category.name}</p>
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
