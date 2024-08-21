import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";

const initialState = {
  isOrderPending: false,
  isOrderFetching:true,
  isOrderUpadtePending: false,
  isPaymentPending: false,
  orders: [],
  paymentDetails: null,
};

export const createOrder = createAsyncThunk(
  "createOrder",
  async (body, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/orders", body);
      if (res?.data?.status === 201) {
        console.log("hit");
        dispatch(getOrders());
      }
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getOrders = createAsyncThunk("getOrders", async () => {
  try {
    const res = await axiosInstance.get("/orders");
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const updateOrders = createAsyncThunk(
  "updateOrders",
  async (body, { dispatch }) => {
    try {
      const res = await axiosInstance.put("/update-order", body);
      if (res?.data?.status === 200) {
        dispatch(getOrders());
      }
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const deleteOrders = createAsyncThunk(
  "deleteOrders",
  async (id, { dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/delete-order/${id}`);
      if (res?.data?.status === 200) {
        dispatch(getOrders());
      }
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const makePayment = createAsyncThunk("makePayment", async (body) => {
  try {
    const res = await axiosInstance.post(`/payment`, body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});


export const fetchPayment = createAsyncThunk("fetchPayment", async (id) => {
  try {
    const res = await axiosInstance.get(`/payment/${id}`);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For Upload Product
      .addCase(createOrder.pending, (state, action) => {
        state.isOrderPending = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        if (payload.status === 201) {
          state.isOrderPending = false;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderPending = true;
      })

      // For fetch Product
      .addCase(getOrders.pending, (state, action) => {
        state.isOrderFetching = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isOrderFetching = false;
          state.orders = payload?.data[0];
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderFetching = true;
      })

      // For update Product
      .addCase(updateOrders.pending, (state, action) => {
        state.isOrderUpadtePending = true;
      })
      .addCase(updateOrders.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isOrderUpadtePending = false;
        }
      })
      .addCase(updateOrders.rejected, (state, action) => {
        state.isOrderUpadtePending = true;
      })

      // For delete Product
      .addCase(deleteOrders.pending, (state, action) => {})
      .addCase(deleteOrders.fulfilled, (state, { payload }) => {})
      .addCase(deleteOrders.rejected, (state, action) => {})

      // For delete Product
      .addCase(makePayment.pending, (state, action) => {
        state.isPaymentPending = true;
      })
      .addCase(makePayment.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isPaymentPending = false;
          state.paymentDetails = payload?.data;
        }
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.isPaymentPending = true;
      })


       // For delete Product
       .addCase(fetchPayment.pending, (state, action) => {
        state.isPaymentPending = true;
      })
      .addCase(fetchPayment.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isPaymentPending = false;
        }
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.isPaymentPending = true;
      })
  },
});

export const {} = orderSlice.actions;

export default orderSlice;
