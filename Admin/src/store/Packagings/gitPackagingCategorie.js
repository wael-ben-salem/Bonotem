import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllData = createAsyncThunk("gitPackagingCategorie/getAllData", async () => {
    try {
      const response = await axios.get("/packaging-categorie");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updatePackaging_categorie = createAsyncThunk(
    "gitPackagingCategorie/updatePackaging_categorie",
    async ({ id, packaging_categorieData }) => {
        try {
            const response = await axios.put(`/updatepackaging-categorie/${id}`, packaging_categorieData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getPackaging_categorieDetails = createAsyncThunk(
    "gitPackagingCategorie/getPackaging_categorieDetails",
    async (packagingId) => {
      try {
        const response = await axios.get(`/packaging-categorie/${packagingId}`);
        console.log("API response:", response);
        return response.data.packagings;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deletePackaging_categorie = createAsyncThunk(
    "gitPackagingCategorie/deletePackaging_categorie",
    async (packagingId) => {
      try {
        const response = await axios.delete(`/deletepackaging-categorie/${packagingId}`);
        console.log("API response:", response);
        return packagingId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addPackaging_categorie = createAsyncThunk("gitPackagingCategorie/addPackaging_categorie", async (packaging_categorieData) => {
    try {
      const response = await axios.post("/addpackaging-categorie", packaging_categorieData);
      console.log("API response:", response);
      return response.data; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitPackagingCategorieSlice = createSlice({
    name: "gitPackagingCategorie",
    initialState: {
        packagings_categorie: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings_categorie.push(action.payload);
      },
      clearPackaging: (state) => {
        state.packagings_categorie = [];
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
          state.packagings_categorie = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updatePackaging_categorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updatePackaging_categorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log("Category Package updated:", action.payload);
          // You may want to update the state accordingly here
        })
        .addCase(updatePackaging_categorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deletePackaging_categorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deletePackaging_categorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Remove the deleted user from the state
          state.packagings_categorie = state.packagings.filter(packaging => packaging.id !== action.payload);
          console.log("Category Package deleted:", action.payload);
        })
        .addCase(deletePackaging_categorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addPackaging_categorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addPackaging_categorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Optionally, you can update state with the newly added user
         
          console.log("Category Package added:", action.payload);
        })
        .addCase(addPackaging_categorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default gitPackagingCategorieSlice.reducer;
