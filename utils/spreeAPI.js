import axios from "axios";
import Cookies from "js-cookie";

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
  const token = Cookies.get("token");
   const endpoint = token
     ? `api/checkout/cart/add/${product_id}?token=true`
     : `api/checkout/cart/add/${product_id}`;
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
      }),
    };

    const response = await fetch(endpoint,options);

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
    console.log("added cart from api ", response);
    return response.json();
  } catch (error) {
    // Handle errors
    console.error("Error adding item to cart:", error);

    throw error;
  }
};

export const cartDetails = async () => {
    const token = Cookies.get("token");
     const endpoint = token
       ? `api/checkout/cart?token=true`
       : `api/checkout/cart`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      // body: JSON.stringify({
      //   product_id: productId,
      //   quantity: quantity,
      // }),
    };

    const response = await fetch(endpoint, options);
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
   const token = Cookies.get("token");
   const endpoint = token
     ? `api/checkout/cart/empty?token=true`
     : `api/checkout/cart/empty`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options);
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
  const token = Cookies.get("token");
   const endpoint = token
     ? `api/checkout/cart/remove-item/${item.id}?token=true`
     : `api/checkout/cart/remove-item/${item.id}`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      // body: JSON.stringify({
      //   cart_item_id: item.id,
      // }),
    };

    const response = await fetch(endpoint, options);

    console.log("last", response.data);
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

export const updateItemQuantity = async (item) => {
   const token = Cookies.get("token");
     const endpoint = token
       ? `api/checkout/cart/update?token=true`
       : `api/checkout/cart/update`;
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        qty: {
          [item.id]: item.quantity,
        },
      }),
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    return response.json();
  } catch (error) {
    console.error("Error empty cart:", error);

    throw error;
  }
};

export const saveAddress = async (billingInfo) => {
  const token = Cookies.get("token");
  const endpoint = token
    ? "/api/checkout/save-address?token=true"
    : "/api/checkout/save-address";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(billingInfo),
  };

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error("Failed to save address");
    }
    return await response.json();
  } catch (error) {
    console.error("Error Save Address:", error);
    console.log(billingInfo);

    throw error;
  }
};

export const saveShiping = async () => {
    const token = Cookies.get("token");
    const endpoint = token
      ? `/api/checkout/save-shipping?token=true`
      : `/api/checkout/save-shipping`;
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipping_method: "free_free",
      }),
    };

    const response = await fetch(endpoint, options);
    console.log("shipping save", response);
    if (!response.ok) {
      throw new Error("Failed to save shipping");
    }
    return await response.json();
  } catch (error) {
    console.error("Error Save Shipping:", error);

    throw error;
  }
};

export const savePayment = async () => {
   const token = Cookies.get("token");
   const endpoint = token
     ? `/api/checkout/save-payment?token=true"`
     : `/api/checkout/save-payment`;
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment: {
          method: "cashondelivery",
        },
      }),
    };

    const response = await fetch(endpoint, options);
    console.log("payment save", response);
    if (!response.ok) {
      throw new Error("Failed to Save Payment");
    }
    return await response.json();
  } catch (error) {
    console.error("Error Save Payment:", error);

    throw error;
  }
};

export const getCurrentCart = async () => {
  const token = Cookies.get("token");
   const endpoint = token
     ? `/api/checkout/save-payment?token=true"`
     : `/api/checkout/save-payment`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, // Add leading slash
      options
    );
    console.log("current cart", response);
    if (!response.ok) {
      throw new Error("Failed to Save Order");
    }
    return await response.json();
  } catch (error) {
    console.error("Error Save Order:", error);

    throw error;
  }
};

export const saveOrder = async (cartInfo) => {
  const token = Cookies.get("token");
  const endpoint = token
    ? "/api/checkout/save-order?token=true"
    : "/api/checkout/save-order";
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cartInfo), // Directly stringify cartParsed
    };

    console.log("cart info:", cartInfo);
    const response = await fetch(endpoint, options);
    console.log("order save response:", response);

    if (!response.ok) {
      throw new Error("Failed to Save Order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error Save Order:", error);
    throw error;
  }
};
