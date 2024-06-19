import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";

const AddToCartButton = ({ variantId, quantity }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addItemToCart({ variantId, quantity }));
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
