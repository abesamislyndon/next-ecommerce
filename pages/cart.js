// pages/cart.js
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch({ type: "cart/addToCart", payload: { id: itemId } });
  };

  const handleDecrement = (itemId) => {
    dispatch({ type: "cart/removeFromCart", payload: { id: itemId } });
  };

const calculateSubtotal = (item) => {
  const parsedQuantity = parseInt(item.quantity);
  const parsedPrice = parseFloat(item.price.replace(/\$/g, "")); // Remove dollar sign before parsing

  console.log("Parsed Quantity:", parsedQuantity);
  console.log("Parsed Price:", parsedPrice);

  if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
    console.error("Invalid quantity or price:", item.quantity, item.price);
    return 0;
  }

  const subtotal = parsedQuantity * parsedPrice;

  console.log("Subtotal:", subtotal);

  return subtotal;
};
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + calculateSubtotal(item);
    }, 0);
  };

  return (
    <div class="max-w-6xl mx-auto p-3 lg:p-0 mt-20">
      <h1 className="mt-3 ml-3 absolute font-bold  text-[1em]">Your Order</h1>
      <button
        className="mt-3 mb-5 text-[1em] float-end mr-3"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
      {cart.items.length === 0 ? (
        <div className="mx-auto container w-fullp-10">
          <table class="min-w-full divide-y divide-gray-200 table-fixed">
            <thead class="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  class="py-3 px-5  lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  class="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200"></tbody>
          </table>
          <p className="mt-4 text-[2rem] font-extrabold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      ) : (
        <div className="mx-auto container w-full p-2">
          <table class="min-w-full divide-y divide-gray-200 table-fixed">
            <thead class="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  class="py-3 px-5 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="py-3  text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="p-3   text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Qty.
                </th>
                <th
                  scope="col"
                  class="p-3   text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  class="py-3 t text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cart.items.map((item) => (
                <tr className="hover:bg-gray-100  text-[12px] lg:text-[16px]" key={item.id}>
                  <td className="p-4">{item.name}</td>
                  <td>${item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td>${calculateSubtotal(item).toFixed(2)}</td>
                  <td>
                    <button
                      className="pt-0 pl-2 pr-2 mr-2 text-[#fff] bg-black"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="pt-0 pl-2 pr-2 mr-2 text-[#fff] bg-black"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                    <button onClick={() => dispatch(removeFromCart(item))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 mb-4 text-[2rem] font-extrabold float-end">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      )}

      <button className="float-end w-full bg-black mt-[0px] py-2 px-4 text-[#fff] ">
        Proceed to Checkout
      </button>
    </div>
  );
}
