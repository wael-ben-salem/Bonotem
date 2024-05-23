import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllCarteStatiqueData = createAsyncThunk(
  "gitCarteStatique/getAllCarteStatiqueData",
  async (id) => {
    try {
      const response = await axios.get(`/cartestatistics/${id}`);
      console.log("API response:", response);
      return response; // Return only the data from the response
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  }
);

export const gitCarteStatiqueSlice = createSlice({
  name: "gitCarteStatique",
  initialState: {
    
    cartesDetails: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarteStatiqueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarteStatiqueData.fulfilled, (state, action) => {
        const {  cartes_details } = action.payload;

        
        state.cartesDetails = cartes_details;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllCarteStatiqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gitCarteStatiqueSlice.reducer;
