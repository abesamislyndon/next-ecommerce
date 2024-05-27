import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  clearCart,
  increaseItem,
  decreaseItem,
  setCart,
  fetchCartDetails,
  fetchCartEmpty,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { CartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function CartPage() {
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.cart);
  const router = useRouter();


console.log('global ni', globalstate);




  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cartItems = localStorage.getItem("ApiCartDetails");
    if (cartItems) {
      dispatch(setCart(JSON.parse(cartItems)));
    }
  }, [dispatch]);

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

  const clearCartDetails = () => {
    dispatch(fetchCartEmpty());
    dispatch(clearCart());
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    dispatch(removeItemFromCart(item));
  };

  const handleCheckout = () => {
    router.push({
      pathname: "/checkout",
      query: { cart: JSON.stringify(globalstate.cart) },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-3 lg:p-0 mt-20">
      <h1 className="mt-3 ml-3 absolute font-bold text-[1em]">Your Order</h1>
      <button
        className="mt-3 mb-5 text-[1em] float-end mr-3"
        onClick={() => clearCartDetails()}
      >
        Clear Cart
      </button>
      {isClient && globalstate.cart.length === 0 ? (
        <div className="mx-auto container w-full p-10">
          <p className="mt-20 mb-20 text-[2rem] font-extrabold text-center">
            Your cart is empty.
          </p>
          <ShoppingCartIcon className="size-20 text-yellow-500 mx-auto mt-[-60px]" />
        </div>
      ) : (
        <div className="mx-auto container w-full p-2">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-5 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-5 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="p-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Qty.
                </th>
                <th
                  scope="col"
                  className="p-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  className="py-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(globalstate.cart) &&
                globalstate.cart.map((item, index) => (
                  <tr
                    className="hover:bg-gray-100 text-[12px] lg:text-[16px]"
                    key={index}
                  >
                    <td className="p-4">
                      {item.base_image && item.base_image.small_image_url && (
                        <img src={item.base_image.small_image_url} alt="" />
                      )}
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td> ₱ {item.price}</td>
                    <td className="p-3">
                      <button
                        className="pt-0 pl-2 pr-2 mr-2 text-[#fff] bg-black"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(decreaseItem(item));
                          } else {
                            dispatch(removeFromCart(item));
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="text-center p-4"> {item.quantity}</span>
                      <button
                        className="pt-0 pl-2 pr-2 mr-2 text-[#fff] bg-black"
                        onClick={() => dispatch(increaseItem(item))}
                      >
                        +
                      </button>
                    </td>
                    <td> ₱ {calculateSubtotal(item).toFixed(2)}</td>
                    <td>
                      <button onClick={() => 
                      removeItem(item)}>Remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mt-4 mb-4 text-[2rem] font-extrabold float-end">
            Total: ₱ {cartTotal.toFixed(2)}
          </p>
        </div>
      )}

      <Link
        className="float-end w-full bg-black mt-[0px] py-2 px-4 text-[#fff]"
        href="/checkout"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
