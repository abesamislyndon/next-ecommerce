import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  clearCart,
  increaseItem,
  decreaseItem,
  setCart,
  fetchCartEmpty,
  removeItemFromCart,
  updateItemQuantity,
} from "../../features/cart/cartSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

export default function CartPage() {
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.cart);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartFromLocalStorage = () => {
      setIsClient(true);
      setLoading(true);
      setTimeout(() => {
        const cartItems = localStorage.getItem("ApiCartDetails");
        if (cartItems) {
          try {
            const parsedCartItems = JSON.parse(cartItems);
            if (Array.isArray(parsedCartItems)) {
              dispatch(setCart(parsedCartItems));
            } else {
              console.error("Parsed cart items are not an array");
            }
          } catch (error) {
            console.error("Error parsing cart items from localStorage", error);
          }
        }
        setLoading(false);
      }, 500); // 1-second delay
    };
    fetchCartFromLocalStorage();
  }, [dispatch]);


// CALCULATE SUBTOTAL
  const calculateSubtotal = (item) => {
    const parsedQuantity = parseInt(item.quantity);
    const parsedPrice = parseFloat(item.price);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return 0;
    }

    return parsedQuantity * parsedPrice;
  };

  const cartTotal = Array.isArray(globalstate.cart)
    ? globalstate.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    : 0;

 // CLEAR CART DETAILS 
  const clearCartDetails = () => {
    dispatch(fetchCartEmpty());
    dispatch(clearCart());
  };

// REMOVE ITEM OR PRODUCTS IN A CERTAIN CART
  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    dispatch(removeItemFromCart(item));
  };

// INCREASE QUANTITY IN CART
  const handleQtyIncrease = (item) => {
    dispatch(increaseItem(item));
    dispatch(updateItemQuantity(item));
  };

// DECREASE QUANTITY IN CART
  const handleQtyDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItem(item));
      dispatch(updateItemQuantity(item));
    } else {
      removeItem(item);
    }
  };

  const handleCheckout = () => {
    router.push({
      pathname: "/billing",
      query: { cart: JSON.stringify(globalstate.cart) },
    });
  };

  if (loading) {
    return (
        <LoadingSpinner />
    );
  }

  if (isClient && globalstate.cart.length === 0) {
    return (
      <div className="mx-auto container w-full p-10">
        <p className="mt-20 mb-20 text-[2rem] font-extrabold text-center">
          Your cart is empty.
        </p>
        <ShoppingCartIcon className="size-10 text-yellow-500 mx-auto mt-[-60px]" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-3 lg:p-0  mt-0 mb-20 lg:mt-20  lg:mb-40">
        <h1 className="mt-3 ml-3 absolute font-bold text-[1em]">Your Order</h1>
        <button
          className="mt-3 mb-5 text-[1em] float-end mr-3"
          onClick={() => clearCartDetails()}
        >
          Clear Cart
        </button>
        <div className="mx-auto container w-full p-0 ">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th
                  scope="col"
                  className="py-3  px-5 text-xs font-medium tracking-wider text-left  uppercase  lg:block hidden"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="w-auto py-3 px-5 text-[8px] lg:text-xs font-medium tracking-wider text-leftuppercase "
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-3 text-[8px] lg:text-xs font-medium tracking-wider text-leftuppercase hide lg:block hidden lg:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="p-3 text-[8px] lg:text-xs font-medium tracking-wider text-left uppercase"
                >
                  Qty.
                </th>
                <th
                  scope="col"
                  className="p-3 text-[8px] lg:text-xs font-medium tracking-wider text-left text-black uppercase"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  className="p-3 text-[8px] lg:text-xs font-medium tracking-wider text-left uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(globalstate.cart) &&
                globalstate.cart.map((item, index) => (
                  <tr className="hover:bg-gray-100" key={index}>
                    <td className="p-0 lg:block hidden">
                      {item.product?.base_image?.small_image_url ? (
                        <img
                          src={item.product.base_image.small_image_url}
                          alt={item.name}
                        />
                      ) : (
                        "Loading Image..."
                      )}
                    </td>

                    {/* Product name and price for mobile */}
                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span>{item.name || "Loading Name..."}</span>
                        <span className="text-[11px] sm:hidden">
                          ₱{" "}
                          {Number(item.price).toFixed(2) || "Loading Price..."}
                        </span>
                      </div>
                    </td>

                    {/* Price only for larger screens */}
                    <td className="p-1 hidden sm:table-cell">
                      <span className="text-[11px]">
                        ₱ {Number(item.price).toFixed(2) || "Loading Price..."}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        <button
                          className="pt-0 pl-2 pr-2 mr-2 w-[40px] text-[#fff] bg-black"
                          onClick={() => handleQtyDecrease(item)}
                        >
                          -
                        </button>
                        <span className="text-center w-[40px]">
                          {item.quantity || "0"}
                        </span>
                        <button
                          className="pt-0 pl-2 pr-2 w-[40px] text-[#fff] bg-black"
                          onClick={() => handleQtyIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>₱ {calculateSubtotal(item).toFixed(2)}</td>

                    <td>
                      <button
                        onClick={() => removeItem(item)}
                        className="ml-5 "
                      >
                        <TrashIcon className="text-black-700 w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mt-1 mb-4 text-[2rem] font-extrabold text-center lg:float-end divide-x-2">
            Total: ₱ {cartTotal.toFixed(2)}
          </p>
        </div>
        <Link
          className="float-end w-full bg-black mt-[0px] py-2 px-4 text-[#fff] text-center"
          href="/checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
    </>
  );
}
