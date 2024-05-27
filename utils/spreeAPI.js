import axios from "axios";

// const SPREE_API_URL = "http://localhost:8000/api/";
// const SPREE_API_KEY = "your-spree-api-key";

export const createCart = async () => {
  try {
    const response = await axios.post(
      `${SPREE_API_URL}/cart`,
      {},
      {
        headers: {
          "Content-Type": "application/vnd.api+json",
          //   Authorization: `Bearer ${SPREE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};



export const addToCart = async (product_id, quantity) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
      }),
    };

    const response = await fetch(
      `api/checkout/cart/add/${product_id}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
    console.log("added cart from api ", product_id);
    return response.json();
  } catch (error) {
    // Handle errors
    console.error("Error adding item to cart:", error);

    throw error;
  }
};



export const cartDetails = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   product_id: productId,
      //   quantity: quantity,
      // }),
    };

    const response = await fetch(`api/checkout/cart`, options);
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    return response.json();
  } catch (error) {
    // Handle errors
    console.error("Error adding item to cart:", error);

    throw error;
  }
};


export const cartEmpty = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   product_id: productId,
      //   quantity: quantity,
      // }),
    };

    const response = await fetch(`api/checkout/cart/empty`, options);
      console.log(response);
    if (!response.ok) {
      throw new Error("Failed empty cart");
    }

    return response.json();
  
  } catch (error) {
    // Handle errors
    console.error("Error empty cart:", error);

    throw error;
  }
};


export const removeItemFromCart = async (item) => {
   console.log('remove me item', item.id);
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   cart_item_id: item.id,
      // }),
    };

    const response = await fetch(
      `api/checkout/cart/remove-item/${item.id}`,
      options
    );

    console.log('last', response.data);
    if (!response.ok) {
      throw new Error("Failed empty cart");
    }
    

    // localStorage.setItem("ApiCartDetails", JSON.stringify(response));

    return response.json();
  } catch (error) {
    // Handle errors
    console.error("Error empty cart:", error);

    throw error;
  }
};