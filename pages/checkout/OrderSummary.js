import React, { useState, useEffect, Suspense, useTransition } from "react";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import LazyDeliveryFee from "./LazyDeliveryFee";

const LazyTotal = React.lazy(() => import("./LazyTotal"));


const OrderSummary = ({
  cart,
  calculateSubtotal,
  calculateTotal,
  deliveryFee,
  loading,
}) => {
  const [lazyDeliveryFee, setLazyDeliveryFee] = useState(null);
  const [lazyTotal, setLazyTotal] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      startTransition(() => {
        const timeoutId = setTimeout(() => {
          setLazyDeliveryFee(deliveryFee || 0);
          const totalAmount = calculateTotal();
          setLazyTotal(totalAmount + (deliveryFee || 0));
        }, 1000);

        return () => clearTimeout(timeoutId);
      });
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
          ₱{calculateSubtotal(item).toFixed(2)}
        </p>
      </div>
    ));

  return (
    <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg sticky top-8  text-red-700">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="mb-4">{renderCartItems()}</div>
      <hr className="pt-5" />
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>₱{calculateTotal().toFixed(2)}</span>
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
