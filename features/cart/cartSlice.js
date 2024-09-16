import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as apiAddToCart,
  cartDetails as apiCartDetails,
  cartEmpty as apiCartEmpty,
  removeItemFromCart as apiRemoveItemFromCart,
  updateItemQuantity as apiUpdateItemQuantity,
  saveAddress as apiSaveAddress,
  saveShiping as apiSavedShipping,
  savePayment as apiSavedPayment,
  saveOrder as apiSavedOrder,
  getCurrentCart as apiGetCurrentCart,
  searchProducts as apiSearchProducts,
} from "../../utils/spreeAPI";

const initialState = {
  cart: [],
  status: "idle",
  searchQuery: "",
  error: null,
};

export const searchProducts = createAsyncThunk(
  "cart/searchProducts",
  async (query) => {
    const response = await apiSearchProducts(query);
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
     return data; // Ensure that this returns the array of products
  }
);

export const fetchCartDetails = createAsyncThunk(
  "cart/cartDetails",
  async () => {
    const response = await apiCartDetails();
    localStorage.setItem("ApiCartDetails", JSON.stringify(response.data)); 
    return response;
  }
);

export const fetchCartEmpty = createAsyncThunk("cart/cartEmpty", async () => {
  const response = await apiCartEmpty();
  return response;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ product_id, quantity }) => {
    const response = await apiAddToCart(product_id, quantity);
    const responses = await apiCartDetails();
    localStorage.setItem("ApiCartDetails", JSON.stringify(responses.data.items));
    return response;
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (item) => {
    const response = await apiRemoveItemFromCart(item);
    return response;
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async (item) => {
    const response = await apiUpdateItemQuantity(item);
    return response;
  }
);
export const saveAddress = createAsyncThunk(
  "cart/saveAddress",
  async (billingInfo) => {
    const response = await apiSaveAddress(billingInfo);
    return response;
  },
);

export const saveShiping = createAsyncThunk(
  "cart/saveShipping",
  async ({ deliveryMethod, pickupLocation }, { rejectWithValue }) => {
    try {
      const response = await apiSavedShipping({
        deliveryMethod,
        pickupLocation,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors from the API
    }
  }
);

export const savePayment = createAsyncThunk("cart/savePayment", async () => {
  const response = await apiSavedPayment();
  localStorage.setItem("FinalCart", JSON.stringify(response));
  return response;
});

export const getCurrentCart = createAsyncThunk(
  "cart/getCurrentCart",
  async (cartParsed) => {
    const response = await apiGetCurrentCart(cartParsed);
   // localStorage.setItem("FinalCart", JSON.stringify(response));
    return response;
  }
);

export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async ({ pickup_location, delivery_method }) => {
    const response = await apiSavedOrder({ pickup_location, delivery_method });
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.cart[existingItemIndex] = {
          ...state.cart[existingItemIndex],
          quantity:
            state.cart[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    increaseItem(state, action) {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    decreaseItem(state, action) {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
      state.products = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
      localStorage.setItem("FinalCart", JSON.stringify(state.cart));
      localStorage.setItem("deliveryMethod", JSON.stringify(state.cart));
      localStorage.setItem("paymentMethod", JSON.stringify(state.cart));
      localStorage.setItem("pickupLocation", JSON.stringify(state.cart));
      localStorage.setItem("deliveryFee", JSON.stringify(state.cart));
    },

    setCart(state, action) {
      let validCartItems = [];
      // Ensure the payload is an array of valid cart items
      validCartItems = action.payload.filter(
        (item) =>
          item && typeof item === "object" && "id" in item && "quantity" in item
      );
      state.cart = validCartItems;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );

        if (existingItemIndex >= 0) {
          state.cart[existingItemIndex] = {
            ...state.cart[existingItemIndex],
            quantity:
              state.cart[existingItemIndex].quantity + action.payload.quantity,
          };
        } else {
          state.cart.push(action.payload);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartEmpty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartEmpty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = [];
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
      })
      .addCase(fetchCartEmpty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
      })
      .addCase(saveAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
     //   console.log("Address saved successfully:", action.payload);
      })
      .addCase(saveAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveShiping.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveShiping.fulfilled, (state, action) => {
        state.status = "succeeded";
     //   console.log("Shipping saved successfully:", action.payload);
      })
      .addCase(saveShiping.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = [];
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
        localStorage.setItem("FinalCart", JSON.stringify(state.cart));
        localStorage.setItem("deliveryMethod", JSON.stringify(state.cart));
        localStorage.setItem("paymentMethod", JSON.stringify(state.cart));
      //  console.log("Shipping saved successfully:", action.payload);
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  clearCart,
  add,
  removeFromCart,
  increaseItem,
  decreaseItem,
  setCart,
  setSearchQuery,
} = cartSlice.actions;
export default cartSlice.reducer;
