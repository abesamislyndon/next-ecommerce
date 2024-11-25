import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  ShoppingCartIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import ent3logo from "../public/image/ent3-logo.png";

export default function Navbar() {
  const [currentCartItemCount, setCurrentCartItemCount] = useState(0);
  const [userinfo, setUserinfo] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const { handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const getUserInfo = () => {
      if (typeof window !== "undefined") {
        const get_user_loggedIn = sessionStorage.getItem("BasicInfo");
        if (get_user_loggedIn) {
          try {
            const parsedUserInfo = JSON.parse(get_user_loggedIn);
            setUserinfo(parsedUserInfo);
          } catch (error) {
            console.error(
              "Error parsing user info from sessionStorage:",
              error
            );
          }
        }
      }
    };

    getUserInfo();

    // Listen for route changes to close the menu
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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

  const Back = () =>{
    router.back();
  }

  return (
    <>
      <nav className="sticky top-0 flex justify-between bg-[#fff] text-dark w-full border-b-[0.1em]  z-50 pt-2 pb-2">
        <div className="xl:px-12 py-1 flex w-full items-center">
          <Link className="text-3xl p-1 mr-1 font-bold font-heading" href="/">
            <Image
              className="h-[40%] w-[40%]  lg:w-[90px] lg:h-auto  ml-2 lg:ml-0"
              src={ent3logo}
              alt="Company Logo"
            />
          </Link>
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-10">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/promotions">Promotions</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
          <div className="grid grid-cols-1 lg:grid-cols-1">
            <div></div>
            <div className="flex xl:flex items-center space-x-10 lg:space-x-10 text-sm ml-10">
              {userinfo === null ? (
                <>
                  <Link href="/login" className="text-xs lg:md hidden lg:block">
                    Login / Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/userprofile" className="font-bold">
                    Hi, {userinfo.first_name}
                  </Link>
                  <button onClick={handleLogout}>
                    <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
                  </button>
                </>
              )}
              <Link
                className="flex items-center hover:text-gray-200 hidden lg:inline"
                href="/cart"
              >
                <ShoppingCartIcon className="text-[#cc0404] w-7 h-7" />
                <span className="flex absolute -mt-10 ml-2">
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
          <div className="fixed top-0 right-0 mt-3 mr-1 md:hidden">
            <button onClick={toggleMenu}>
              <svg
                className="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 h-full w-[50%] bg-[#000] text-white shadow-lg z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-10">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-left space-y-4 pl-10 text-lg">
            <li>
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="/promotions" onClick={toggleMenu}>
                Promotions
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu}>
                Contact us
              </Link>
            </li>
            {userinfo === null ? (
              <>
                <li>
                  <Link href="/login" onClick={toggleMenu}>
                    Login / Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/userinfo" onClick={toggleMenu}>
                    Hi, {userinfo.first_name}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {router.pathname !== "/" && (
        <div className="lg:hidden block mx-auto p-3 bg-gray-200">
          <span className="text-sm">
            <ArrowLeftIcon className="w-5" onClick={Back} />
          </span>
        </div>
      )}
    </>
  );
}
