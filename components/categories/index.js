import { useState } from "react";
import Image from "next/image";
import Pork from "../../public/image/pig.png";
import Beef from "../../public/image/beef.png";
import Chicken from "../../public/image/chicken.png";
import Marinated from "../../public/image/marinated.png";
import All from "../../public/image/all.png";
import Link from "next/link";

const Categories = ({ categories }) => {


  if (!categories || !categories.data) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 px-3 pb-1 sm:grid-cols-3 sm:px-8 mt-0 lg:mt-1 lg:grid-cols-5 lg:gap-x-4 lg:px-0 p-12 text-center">
        {categories.data.map((category) => (
          <div key={category.id} className="w-full bg-white p-5 -mt-10 shadow-sm rounded-lg">
            <Link href={`category/${category.id}`}>
              {category.name === "Pork" ? (
                <>
                  <Image src={Pork} className="w-20 mx-auto" />
                  <span className="text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Beef" ? (
                <>
                  <Image src={Beef} className="w-20 mx-auto" />
                  <span className="text-1xl">
                    <p className="mt-2 text-rose-950 font-bold">
                      {category.name}
                    </p>
                  </span>
                </>
              ) : category.name === "Chicken" ? (
                <>
                  <Image src={Chicken} className="w-20 mx-auto" />
                  <p className="mt-2 text-rose-950 font-bold">
                    {category.name}
                  </p>
                </>
              ) : category.name === "Imerich templado" ? (
                <>
                  <Image src={Marinated} className="w-20 mx-auto" />
                  <p className="mt-2 text-rose-950 font-bold">
                    {category.name}
                  </p>
                </>
              ) : (
                <>
                  <Image src={All} className="w-20 mx-auto" />
                  <span className="text-1xl">All</span>
                </>
              )}
              <a/>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
