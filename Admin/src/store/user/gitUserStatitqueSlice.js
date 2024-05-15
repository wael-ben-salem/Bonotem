import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllUserStatiqueData = createAsyncThunk(
  "gitUserStatique/getAllUserStatiqueData",
  async () => {
    try {
      const response = await axios.get("/user-statistics");
      console.log("API response:", response);
      return response; // Retourner uniquement les données de la réponse
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  }
);

export const gitUserStatiqueSlice = createSlice({
  name: "gitUserStatique",
  initialState: {
    totalRestaurateurs: 0,
    totalManagers: 0,
    totalAmountManagers: 0,
    best_manager_name: "", // Modifier le nom de la clé pour correspondre à la nouvelle structure d'API
    userStatistics: [], // Ajouter une clé pour stocker les données des utilisateurs
    num_users_by_best_manager:0,
    loading: false, // Ajouter loading state
    error: null, // Ajouter error state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserStatiqueData.pending, (state) => {
        state.loading = true; // Set loading to true while fetching data
        state.error = null; // Reset error state
      })
      .addCase(getAllUserStatiqueData.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when data fetching is successful
        state.totalRestaurateurs = action.payload.total_restaurateurs; // Update state with received data
        state.totalManagers = action.payload.total_managers;
        state.totalAmountManagers = action.payload.total_amount_managers;
        
        state.best_manager_name = action.payload.best_manager_name;

        state.num_users_by_best_manager = action.payload.num_users_by_best_manager;
        state.userStatistics = action.payload.user_statistics; // Update user statistics data
      })
      .addCase(getAllUserStatiqueData.rejected, (state, action) => {
        state.loading = false; // Set loading to false when data fetching is unsuccessful
        state.error = action.error.message; // Update error state with error message
      });
  },
});

export default gitUserStatiqueSlice.reducer;
