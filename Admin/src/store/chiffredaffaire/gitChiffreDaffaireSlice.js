import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllChiffreDaffaireData = createAsyncThunk(
  "gitChiffreDaffaireStatique/getAllChiffreDaffaireData",
  async (id) => {
    try {
      const response = await axios.get(`/chiffre-affaire/${id}`);
      console.log("API response:", response);
      return response; // Retourner uniquement les données de la réponse
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  }
);

export const gitChiffreDaffaireSlice = createSlice({
  name: "gitChiffreDaffaire",
  initialState: {
    montant_total: 0,
    chiffre_total: 0,
    totalchargefix:0,
    totalchargevariable:0,
    benefice: 0,
    date_debut: "", // Modifier le nom de la clé pour correspondre à la nouvelle structure d'API
    date_fin:"",
    loading: false, // Ajouter loading state
    error: null, // Ajouter error state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChiffreDaffaireData.pending, (state) => {
        state.loading = true; // Set loading to true while fetching data
        state.error = null; // Reset error state
      })
      .addCase(getAllChiffreDaffaireData.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when data fetching is successful
        state.montant_total = action.payload.montant_total; // Update state with received data
        state.chiffre_total = action.payload.chiffre_total;
        state.totalchargefix = action.payload.totalchargefix;

        state.benefice = action.payload.benefice;
        state.totalchargevariable = action.payload.totalchargevariable;

        state.date_debut = action.payload.date_debut;
        state.date_fin = action.payload.date_fin; // Update user statistics data
      })
      .addCase(getAllChiffreDaffaireData.rejected, (state, action) => {
        state.loading = false; // Set loading to false when data fetching is unsuccessful
        state.error = action.error.message; // Update error state with error message
      });
  },
});

export default gitChiffreDaffaireSlice.reducer;
