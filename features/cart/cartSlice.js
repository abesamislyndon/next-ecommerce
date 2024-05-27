import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as apiAddToCart,
  cartDetails as apiCartDetails,
  cartEmpty as apiCartEmpty,
  removeItemFromCart as apiRemoveItemFromCart,
} from "../../utils/spreeAPI";

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchCartDetails = createAsyncThunk(
  "cart/cartDetails",
  async () => {
    const response = await apiCartDetails();
    localStorage.setItem("ApiCartDetails", JSON.stringify(response.data)); // Set response directly into local storage
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
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("ApiCartDetails", JSON.stringify(state.cart));
    },
    setCart(state, action) {
      let validCartItems = [];
        // Ensure the payload is an array of valid cart items
        validCartItems = action.payload.filter(
          (item) =>
            item &&
            typeof item === "object" &&
            "id" in item &&
            "quantity" in item
        );
      // Update the cart state with the valid items
      state.cart = validCartItems;
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
} = cartSlice.actions;
export default cartSlice.reducer;
