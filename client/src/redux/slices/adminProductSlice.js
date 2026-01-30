import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Base API URL
 */
const API_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Authorization header helper
 * Always reads the latest token from localStorage
 */
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("userToken")}`,
});

/* ==========================================================================
   ASYNC THUNKS
   ========================================================================== */

/**
 * Fetch all products (Admin only)
 */
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/products`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

/**
 * Create a new product
 */
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create product");
    }
  }
);

/**
 * Update an existing product
 */
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update product");
    }
  }
);

/**
 * Delete a product
 */
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${id}`,
        { headers: getAuthHeaders() }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);

/* ==========================================================================
   SLICE
   ========================================================================== */

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ================= FETCH PRODUCTS ================= */
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE PRODUCT ================= */
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE PRODUCT ================= */
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE PRODUCT ================= */
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
