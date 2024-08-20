import React, { useState, useEffect } from "react";

const LazyDeliveryFee = ({ fee }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return loading ? (
    <div className="spinner"></div>
  ) : (
    <span>₱{fee.toFixed(2)}</span>
  );
};

export default LazyDeliveryFee;
