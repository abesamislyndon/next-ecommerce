import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  customerPurchase: [],
  status: "idle",
  error: null,
};

export const fetchPurchaseOrder = createAsyncThunk(
    "userprofile/purchases",
    async() =>{
        const response = await apiCustomerPurchaseOrders();
        return response;
    }
);

