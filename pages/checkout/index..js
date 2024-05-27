// pages/checkout.js
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart);

  const calculateSubtotal = (item) => {
    const parsedQuantity = parseInt(item.quantity);
    const parsedPrice = parseFloat(item.price.replace(/\$/g, ""));

    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return 0;
    }

    return parsedQuantity * parsedPrice;
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + calculateSubtotal(item);
    }, 0);
  };

  return (
    // <div className="max-w-6xl mx-auto p-3 lg:p-0 mt-20">
    //   <h1 className="mt-3 ml-3 font-bold text-[1em]">Checkout</h1>
    //   <div className="mx-auto container w-full p-2">
    //     <table className="min-w-full divide-y divide-gray-200 table-fixed">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="py-3 px-5 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    //             Name
    //           </th>
    //           <th className="py-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    //             Price
    //           </th>
    //           <th className="p-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    //             Qty.
    //           </th>
    //           <th className="p-3 text-[10px] lg:text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    //             Subtotal
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className="bg-white divide-y divide-gray-200">
    //         {cart.items.map((item) => (
    //           <tr
    //             className="hover:bg-gray-100 text-[12px] lg:text-[16px]"
    //             key={item.id}
    //           >
    //             <td className="p-4">{item.name}</td>
    //             <td>${item.price}</td>
    //             <td className="p-3">{item.quantity}</td>
    //             <td>${calculateSubtotal(item).toFixed(2)}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     <p className="mt-4 mb-4 text-[2rem] font-extrabold float-end">
    //       Total: ${calculateTotal().toFixed(2)}
    //     </p>
    //   </div>
    // </div>
    <div className="font-[sans-serif] bg-white p-4 min-h-screen">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-lg:order-1">
            <h2 className="text-3xl font-extrabold text-[#333]">
              Make a payment
            </h2>
            <p className="text-[#333] text-base mt-6">
              Complete your transaction swiftly and securely with our
              easy-to-use payment process.
            </p>
            <form className="mt-12 max-w-lg">
              <div className="grid gap-6">
                <input
                  type="text"
                  placeholder="Cardholder's Name"
                  className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                />
                <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 ml-3"
                    viewBox="0 0 32 20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="#f93232"
                      data-original="#f93232"
                    />
                    <path
                      fill="#fed049"
                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      className="hovered-path"
                      data-original="#fed049"
                    />
                  </svg>
                  <input
                    type="number"
                    placeholder="Card Number"
                    className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="number"
                    placeholder="EXP."
                    className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="CVV"
                    className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-6 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-4xl font-extrabold text-[#333]">
              {" "}
              Total: ${calculateTotal().toFixed(2)}
            </h2>

            {cart.items.map((item) => (
              <ul key={item.id} className="text-[#333] mt-10 space-y-6">
                <li className="flex flex-wrap gap-4 text-base">
                  {item.name}
                  <span className=" font-bold">X {item.quantity}</span>
                  <span className="ml-auto font-bold">
                    ${calculateSubtotal(item).toFixed(2)}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
