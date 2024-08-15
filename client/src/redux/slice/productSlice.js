import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";

const initialState = {
  isProductCreatePending: true,
  isProductFetchPending: true,
  isSingleProductFetching: true,
  isUpdateProductPending: true,
  isProductImageDeletePending:true,
  isSingleCategoryProductFetching:true,
  allProducts: [],
  singleCategoryProductList:[]
};

export const createProduct = createAsyncThunk("createProduct", async (body) => {
  try {
    const res = await axiosInstance.post("/products", body);
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const getProducts = createAsyncThunk("getProduct", async () => {
  try {
    const res = await axiosInstance.get("/products");
    return res?.data;
  } catch (err) {
    throw err;
  }
});

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (id) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, body }) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, body);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage",
  async (body) => {
    try {
      const res = await axiosInstance.put(`/delete-product-image`, body);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getSingleProductByCategory = createAsyncThunk(
  "getSingleProductByCategory",
  async () => {
    try {
      const res = await axiosInstance.get(`/single-category-product`);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For Upload Product
      .addCase(createProduct.pending, (state, action) => {
        state.isProductCreatePending = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        if (payload.status === 201) {
          state.isProductCreatePending = false;
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isProductCreatePending = true;
      })

      // For Fetch Product
      .addCase(getProducts.pending, (state, action) => {
        state.isProductFetchPending = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.allProducts = payload?.data;
          state.isProductFetchPending = false;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductFetchPending = true;
      })

      // For Fetch Single Product
      .addCase(getSingleProduct.pending, (state, action) => {
        state.isSingleProductFetching = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isSingleProductFetching = false;
        }
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isSingleProductFetching = true;
      })

      // For Update Product
      .addCase(updateProduct.pending, (state, action) => {
        state.isUpdateProductPending = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isUpdateProductPending = false;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdateProductPending = true;
      })

      // For Delete Product Image
      .addCase(deleteProductImage.pending, (state, action) => {
        state.isProductImageDeletePending = true;
      })
      .addCase(deleteProductImage.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isProductImageDeletePending = false;
        }
      })
      .addCase(deleteProductImage.rejected, (state, action) => {
        state.isProductImageDeletePending = true;
      })


       // For get single category product
       .addCase(getSingleProductByCategory.pending, (state, action) => {
        state.isSingleCategoryProductFetching = true;
      })
      .addCase(getSingleProductByCategory.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.isSingleCategoryProductFetching = false;
          state.singleCategoryProductList = payload?.data
        }
      })
      .addCase(getSingleProductByCategory.rejected, (state, action) => {
        state.isSingleCategoryProductFetching = true;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice;
