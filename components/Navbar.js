
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  
  const [currentCartItemCount, setCurrentCartItemCount] = useState(0);
  const [userinfo, setUserinfo] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const { handleLogout } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const get_user_logedIn = sessionStorage.getItem("BasicInfo");
      setUserinfo(get_user_logedIn);
    } 
  }, []);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const itemCount = cart.reduce((acc, item) => {
        return acc + (item.quantity || 0);
      }, 0);
      setCurrentCartItemCount(itemCount);
    } else {
      console.error("Cart is not an array:", cart);
    }
  }, [cart]);

  return (
    <nav className="flex justify-between bg-[#FFDC52] text-dark w-screen">
      <div className="xl:px-12 py-6 flex w-full items-center">
        <Link className="text-3xl font-bold font-heading" href="/">
          PET WORLD PH
        </Link>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <Link href="/">Home</Link>
          <Link href="">About</Link>
          <Link href="">Products</Link>
          <Link href="">Contact us</Link>
        </ul>
        <div className="hidden xl:flex  space-x-5 items-center">
          {userinfo === null ? (
            <>
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Login</Link>
            </>
          ) : (
            <>
              <Link href="/userinfo">Hi, {userinfo}</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
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
        </div>
      </div>
      {/* Your other navigation items */}
    </nav>
  );
}
