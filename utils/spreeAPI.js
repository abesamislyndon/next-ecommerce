import axios from "axios";

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
    console.log("added cart from api ", response);
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
  console.log("remove me item", item.id);
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
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qty: {
          [item.id]: item.quantity,
        },
      }),
    };

    const response = await fetch(`api/checkout/cart/update`, options);

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
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billingInfo),
    };

    const response = await fetch(
      "/api/checkout/save-address", // Add leading slash
      options
    );

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
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipping_method: "free_free",
      }),
    };

    const response = await fetch(
      "/api/checkout/save-shipping", // Add leading slash
      options
    );
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
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: {
          method: "cashondelivery",
        },
      }),
    };

    const response = await fetch(
      "/api/checkout/save-payment", // Add leading slash
      options
    );
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
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "/api/checkout/cart", // Add leading slash
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
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartInfo), // Directly stringify cartParsed
    };

    console.log("cart info:", cartInfo);
    const response = await fetch("api/checkout/save-order", options);
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
