import React, { useState, useEffect, Suspense } from "react";
import LoadingSpinner from "../../components/loading/LoadingSpinner.js";
import LazyDeliveryFee from "./LazyDeliveryFee.js";
import { formatPrice } from "../../components/helpers/helpers.js";

const LazyTotal = React.lazy(() => import("./LazyTotal.js"));

const OrderSummary = ({
  cart = [], // Default value to prevent the error
  calculateSubtotal,
  calculateTotal,
  deliveryFee,
  loading,
}) => {
  const [lazyDeliveryFee, setLazyDeliveryFee] = useState(null);
  const [lazyTotal, setLazyTotal] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const timeoutId = setTimeout(() => {
        setLazyDeliveryFee(deliveryFee || 0);
        const totalAmount = calculateTotal();
        setLazyTotal(totalAmount + (deliveryFee || 0));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isHydrated, calculateTotal, deliveryFee, loading]);

  const renderCartItems = () =>
    cart.map((item, index) => (
      <div key={index} className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg text-[#333]">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.quantity} x ₱{item.price}
          </p>
        </div>
        <p className="font-semibold text-lg text-[#333]">
          {formatPrice(calculateSubtotal(item))}
        </p>
      </div>
    ));

  return (
    <div className="lg:w-1/2 bg-gray-50 p-12 lg:p-12 rounded-lg shadow-lg sticky top-8 text-red-700">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="mb-4">{renderCartItems()}</div>
      <hr className="pt-5" />
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>{formatPrice(calculateTotal())}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee:</span>
        {isHydrated ? (
          <Suspense fallback={<LoadingSpinner />}>
            <LazyDeliveryFee
              fee={lazyDeliveryFee ?? 0}
              spinnerStatus={loading}
            />
          </Suspense>
        ) : (
          <span>₱0.00</span>
        )}
      </div>
      <div className="flex justify-between font-bold text-[30px]">
        <span>Total:</span>
        {isHydrated ? (
          <Suspense fallback={<LoadingSpinner />}>
            <LazyTotal total={lazyTotal ?? 0} />
          </Suspense>
        ) : (
          <span>₱0.00</span>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
