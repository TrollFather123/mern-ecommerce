import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { destroyCookie, setCookie } from "nookies";

const initialState = {
  isUserPending: true,
  user: null,
  isUserUpdatePending: true,
  isResetPasswordPending: true,
  isOtpPending: true,
};

export const signupUser = createAsyncThunk("signup", async (body) => {
  try {
    const res = await axiosInstance.post("/signup", body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const verifyOTP = createAsyncThunk("verifyOTP", async (body) => {
  try {
    const res = await axiosInstance.post(`/verify-otp`, body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const resendOTP = createAsyncThunk("resendOTP", async (body) => {
  try {
    const res = await axiosInstance.post(`/resend-otp`, body);
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
    throw err?.message;
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

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const res = await axiosInstance.get("/all-users");
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async ({ id, body }) => {
    try {
      console.log(body, "body");
      const res = await axiosInstance.put(`/update-user-role/${id}`, body);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const resetPassword = createAsyncThunk("resetPassword", async (body) => {
  try {
    const res = await axiosInstance.post("/password-change-link-sent", body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async ({ id, body }) => {
    try {
      const res = await axiosInstance.put(`/change-password/${id}`, body);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedOut: (state, action) => {
      state.user = action?.payload;
      destroyCookie(null, "token", {
        path: "/",
      });
      destroyCookie(null, "userID", {
        path: "/",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // For Sign up
      .addCase(signupUser.pending, (state, action) => {
        state.isUserPending = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        if (payload.status === 201) {
          state.isUserPending = false;
          setCookie(null, "userID", payload?.data?._id, {
            path: "/",
          });
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isUserPending = true;
      })

      // For verify otp
      .addCase(verifyOTP.pending, (state, action) => {
        state.isOtpPending = true;
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isOtpPending = false;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
          setCookie(null, "userID", payload?.data?._id, {
            path: "/",
          });
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isOtpPending = true;
      })

      // For resend otp
      .addCase(resendOTP.pending, (state, action) => {
        state.isOtpPending = true;
      })
      .addCase(resendOTP.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isOtpPending = false;
        }
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isOtpPending = true;
      })

      // For Login

      .addCase(loginUser.pending, (state, action) => {
        state.isUserPending = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserPending = false;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });

          setCookie(null, "user", payload?.data, {
            path: "/",
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserPending = true;
      })

      // For Current User

      .addCase(getCurrentUser.pending, (state, action) => {
        state.isUserPending = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserPending = false;
          state.user = payload?.data;
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isUserPending = true;
      })

      // For All Users

      .addCase(getAllUsers.pending, (state, action) => {
        state.isUserPending = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserPending = false;
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isUserPending = true;
      })

      // Update User Role

      .addCase(updateUserRole.pending, (state, action) => {
        state.isUserUpdatePending = true;
      })
      .addCase(updateUserRole.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUserUpdatePending = false;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isUserUpdatePending = true;
      })

      // Reset Password

      .addCase(resetPassword.pending, (state, action) => {
        state.isResetPasswordPending = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isResetPasswordPending = false;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isResetPasswordPending = true;
      })

      // Change Password

      .addCase(changePassword.pending, (state, action) => {
        state.isResetPasswordPending = true;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isResetPasswordPending = false;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isResetPasswordPending = true;
      });
  },
});

export const { loggedOut } = userSlice.actions;

export default userSlice;
