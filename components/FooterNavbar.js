import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

export default function FooterNavbar() {
  const [currentCartItemCount, setCurrentCartItemCount] = useState(0);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const itemCount = cart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
      setCurrentCartItemCount(itemCount);
    } else {
      console.error("Cart is not an array:", cart);
    }
  }, [cart]);

  return (
    <nav className="fixed bottom-0 pb-6 pt-6 w-full bg-black border-t-2 shadow-md md:hidden">
      {" "}
      {/* Hidden on larger screens */}
      <div className="flex justify-around items-center p-2">
        <Link href="/" className="flex flex-col items-center">
          <HomeIcon className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Home</span>
        </Link>
        <Link href="/" className="flex flex-col items-center">
          <MagnifyingGlassIcon className="w-6 h-6 text-[#fff]" />
          <span className="text-xs text-[#fff]">Search</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center relative">
          <ShoppingCartIcon className="w-6 h-6 text-[#fff]" />
          <span className="text-xs text-[#fff]">Cart</span>
          {/* Add cart item count badge */}
          {currentCartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text- bg-yellow-500 rounded-full">
              {currentCartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
