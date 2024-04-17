import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllData = createAsyncThunk("gitCategorie/getAllData", async () => {
    try {
      const response = await axios.get("/categorie");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateCategorie = createAsyncThunk(
    "gitCategorie/updateCategorie",
    async ({ id, categorieData }) => {
        try {
            const response = await axios.put(`/categorie/${id}`, categorieData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getCategorieeDetails = createAsyncThunk(
    "gitCategorie/getPackaging_categorieDetails",
    async (categorieId) => {
      try {
        const response = await axios.get(`/categorie/${categorieId}`);
        console.log("API response:", response);
        return response.categories;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteCategorie = createAsyncThunk(
    "gitCategorie/deletePackaging_categorie",
    async (categorieId) => {
      try {
        const response = await axios.delete(`/categorie/${categorieId}`);
        console.log("API response:", response);
        return categorieId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addCategorie = createAsyncThunk("gitCategorie/addPackaging_categorie", async (newCategorieData) => {
    try {
      const response = await axios.post("/categori", newCategorieData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitCategorieSlice = createSlice({
    name: "gitCategorie",
    initialState: {
        categories: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings_categorie.push(action.payload);
      },
      clearPackaging: (state) => {
        state.categories = [];
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
          state.categories = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCategorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log("Category Package updated:", action.payload);
          // You may want to update the state accordingly here
        })
        .addCase(updateCategorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCategorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Remove the deleted user from the state
          state.categories = state.categories.filter(packaging => packaging.id !== action.payload);
          console.log("Category Package deleted:", action.payload);
        })
        .addCase(deleteCategorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addCategorie.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Optionally, you can update state with the newly added user
         
          console.log("Category Package added:", action.payload);
        })
        .addCase(addCategorie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default gitCategorieSlice.reducer;
