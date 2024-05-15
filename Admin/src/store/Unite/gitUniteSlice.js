import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllUnite = createAsyncThunk("gitUnite/getAllData", async () => {
    try {
      const response = await axios.get("/unite");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });
  


  

  export const gitUniteSlice = createSlice({
    name: "gitUniteSlice",
    initialState: {
        unites: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your additional reducers here
      addProduit: (state, action) => {
        state.unites.push(action.payload);
      },
      clearProduit: (state) => {
        state.unites = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllUnite.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllUnite.fulfilled, (state, action) => {
          state.loading = false;
          state.unites = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllUnite.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
       
    },
  });

  export default gitUniteSlice.reducer;
