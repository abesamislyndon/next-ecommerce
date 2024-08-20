import React from "react";

const LazyTotal = ({ total }) => {
  return <span>₱{total.toFixed(2)}</span>;
};

export default LazyTotal;
