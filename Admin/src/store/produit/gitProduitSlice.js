import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllProduit = createAsyncThunk("gitProduit/getAllData", async () => {
    try {
      const response = await axios.get("/produit");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateProduit = createAsyncThunk(
    "gitProduit/updateProduit",
    async ({ id, produitData }) => {
        try {
            const response = await axios.put(`/produit/${id}`, produitData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getProduitDetails = createAsyncThunk(
    "gitProduit/getProduitroduitDetails",
    async (produitId) => {
      try {
        const response = await axios.get(`/produit/${produitId}`);
        console.log("API response:", response);
        return response.produits;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteProduit = createAsyncThunk(
    "gitProduit/deleteProduit",
    async (produitId) => {
      try {
        const response = await axios.delete(`/produit/${produitId}`);
        console.log("API response:", response);
        return produitId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addProduit = createAsyncThunk("gitProduit/addProduit", async (newProduitData) => {
    try {
      const response = await axios.post("/produit", newProduitData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitProduitSlice = createSlice({
    name: "gitProduitSlice",
    initialState: {
        produits: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your additional reducers here
      addProduit: (state, action) => {
        state.produit.push(action.payload);
      },
      clearProduit: (state) => {
        state.produit = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllProduit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllProduit.fulfilled, (state, action) => {
          state.loading = false;
          state.produits = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllProduit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateProduit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProduit.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log("Category Package updated:", action.payload);
          // You may want to update the state accordingly here
        })
        .addCase(updateProduit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteProduit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProduit.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Remove the deleted user from the state
          state.Produit = state.categories.filter(produit => produit.id !== action.payload);
          console.log("Category Produit deleted:", action.payload);
        })
        .addCase(deleteProduit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addProduit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProduit.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Optionally, you can update state with the newly added user
         
          console.log("Category Package added:", action.payload);
        })
        .addCase(addProduit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default gitProduitSlice.reducer;
