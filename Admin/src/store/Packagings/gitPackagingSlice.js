import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllData = createAsyncThunk("gitPackaging/getAllData", async () => {
    try {
      const response = await axios.get("/packaging");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updatePackaging = createAsyncThunk(
    "gitPackagingr/updatePackaging",
    async ({ id, packagingData }) => {
        try {
            const response = await axios.put(`/updatepackaging/${id}`, packagingData);
            console.log("API response:", response);
            return response.data; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getPackagingDetails = createAsyncThunk(
    "gitPackaging/getPackagingDetails",
    async (packagingId) => {
      try {
        const response = await axios.get(`/packaging/${packagingId}`);
        console.log("API response:", response);
        return response.data.packagings;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deletePackaging = createAsyncThunk(
    "gitPackaging/deletePackaging",
    async (packagingId) => {
      try {
        const response = await axios.delete(`/deletepackaging/${packagingId}`);
        console.log("API response:", response);
        return packagingId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addPackaging = createAsyncThunk("gitPackaging/addPackaging", async (packagingData) => {
    try {
      const response = await axios.post("/addpackaging", packagingData);
      console.log("API response:", response);
      return response.data; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitPackagingSlice = createSlice({
    name: "gitPackging",
    initialState: {
      packagings: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings.push(action.payload);
      },
      clearPackaging: (state) => {
        state.packagings = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllData.fulfilled, (state, action) => {
          state.loading = false;
          state.packagings = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updatePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updatePackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log("Package updated:", action.payload);
          // You may want to update the state accordingly here
        })
        .addCase(updatePackaging.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deletePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deletePackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Remove the deleted user from the state
          state.packagings = state.packagings.filter(packaging => packaging.id !== action.payload);
          console.log("Package deleted:", action.payload);
        })
        .addCase(deletePackaging.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addPackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addPackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Optionally, you can update state with the newly added user
         
          console.log("Package added:", action.payload);
        })
        .addCase(addPackaging.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default gitPackagingSlice.reducer;
