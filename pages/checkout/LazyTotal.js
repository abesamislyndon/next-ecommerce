import React from "react";
import { formatPrice } from "../../components/helpers/helpers";

const LazyTotal = ({ total }) => {
  return <span>{formatPrice(total)}</span>;
};

export default LazyTotal;
