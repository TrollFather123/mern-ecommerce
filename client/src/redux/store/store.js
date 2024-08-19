import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import productSlice from "../slice/productSlice";
import orderSlice from "../slice/orderSlice";


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer
  },
});
