import React, { useState, useEffect } from "react";

const LazyDeliveryFee = ({ fee, spinnerStatus }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Simulate loading delay
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return spinnerStatus ? (
    <div className="spinner"></div>
  ) : (
    <span>₱{fee}</span>
  );
};

export default LazyDeliveryFee;
