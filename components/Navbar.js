import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
 const [currentCartItemCount, setCurrentCartItemCount] = useState(0);
 const cart = useSelector((state) => state.cart.cart);

 
//  useEffect(() => {
//    const itemCount = cart.reduce((acc, item) => {
//      return acc + (item.quantity || 0);
//    }, 0);
//    setCurrentCartItemCount(itemCount);
//  }, [cart]);


 useEffect(() => {
  // Ensure cart is an array before calling reduce
  if (Array.isArray(cart)) {
       const itemCount = cart.reduce((acc, item) => {
         return acc + (item.quantity || 0);
       }, 0);
       setCurrentCartItemCount(itemCount);

  } else {
    console.error('Cart is not an array:', cart);
  }
}, [cart]); // Ensure the useEffect reruns whenever cart changes

  return (
    <nav className="flex justify-between bg-[#FFDC52] text-dark w-screen">
      <div className="xl:px-12 py-6 flex w-full items-center">
        <Link className="text-3xl font-bold font-heading" href="/">
          Pik and Pak
        </Link>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          {/* Your navigation links */}
        </ul>
        <div className="hidden xl:flex  space-x-5 items-center">
          <Link className="flex items-center hover:text-gray-200" href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Your SVG icon for the cart */}
            </svg>
            <ShoppingCartIcon className="text-yellow-700 w-7 h-7" />
            <span className="flex absolute -mt-6 ml-2">
              <span className="absolute inline-flex h-5 w-5 rounded-full bg-black-400 opacity-75"></span>

              <span className="relative text-center rounded-full h-6 w-6 bg-black text-[#fff] opacity-75">
                <span className="relative text-[13px] text-[#fff]">
                  {currentCartItemCount}
                </span>
              </span>
            </span>
          </Link>
          {/* Your other navigation items */}
        </div>
      </div>
      {/* Your other navigation items */}
    </nav>
  );
}
