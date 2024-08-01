import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { destroyCookie, setCookie } from "nookies";

const initialState = {
  isCreateUSerPending: true,
  newUser: null,
};

export const signupUser = createAsyncThunk("signup", async (body) => {
  try {
    const res = await axiosInstance.post("/signup", body);
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
      state.newUser = null;
      destroyCookie(null, "token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (action, state) => {
        state.isCreateUSerPending = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        if (payload.status === 201) {
          state.isCreateUSerPending = false;
          state.newUser = payload?.data;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
        }
      })
      .addCase(signupUser.rejected, (action, state) => {
        state.isCreateUSerPending = true;
      });
  },
});

export const { loggedOut } = userSlice.actions;

export default userSlice.reducer;
