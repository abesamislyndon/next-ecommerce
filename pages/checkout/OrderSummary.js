// components/OrderSummary.js
import React from "react";

const OrderSummary = ({ cart, calculateSubtotal, calculateTotal }) => {
  return (
    <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-2xl font-extrabold text-[#333] mb-7">
        Order Summary
      </h2>
      {cart.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg text-[#333]">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.quantity} x ₱{item.price}
            </p>
          </div>
          <p className="font-semibold text-lg text-[#333]">
            ₱{calculateSubtotal(item).toFixed(2)}
          </p>
        </div>
      ))}

      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-[#333]">Total</h3>
        <p className="text-xl font-semibold text-red-800">
          ₱{calculateTotal().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
