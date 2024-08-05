import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { destroyCookie, setCookie } from "nookies";

const initialState = {
  isUserPending: true,
  user:null
};

export const signupUser = createAsyncThunk("signup", async (body) => {
  try {
    const res = await axiosInstance.post("/signup", body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const loginUser = createAsyncThunk("login", async (body) => {
  try {
    const res = await axiosInstance.post("/login", body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});


export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const res = await axiosInstance.get("/user-details");
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedOut: (action, state) => {
      state.user = null;
      destroyCookie(null, "token");
    },
  },
  extraReducers: (builder) => {
    builder
    // For Sign up
      .addCase(signupUser.pending, (action, state) => {
        state.isUserPending = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        if (payload.status === 201) {
          state.isUserPending = false;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
        }
      })
      .addCase(signupUser.rejected, (action, state) => {
        state.isUserPending = true;
      })
      // For Login

      .addCase(loginUser.pending, (action, state) => {
        state.isUserPending = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserPending = false;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
        }
      })
      .addCase(loginUser.rejected, (action, state) => {
        state.isUserPending = true;
      })

       // For Current User

       .addCase(getCurrentUser.pending, (action, state) => {
        state.isUserPending = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserPending = false;
          state.user = payload?.data;
        }
      })
      .addCase(getCurrentUser.rejected, (action, state) => {
        state.isUserPending = true;
      })
  },
});

export const { loggedOut } = userSlice.actions;

export default userSlice.reducer;
