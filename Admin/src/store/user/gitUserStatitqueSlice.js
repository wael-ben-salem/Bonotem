import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllUserStatiqueData = createAsyncThunk(
  "gitUserStatique/getAllUserStatiqueData",
  async () => {
    try {
      const response = await axios.get("/user-statistics");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); 
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
    best_manager_name: "", 
    userStatistics: [], 
    num_users_by_best_manager:0,
    loading: false, 
    error: null, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserStatiqueData.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(getAllUserStatiqueData.fulfilled, (state, action) => {
        state.loading = false; 
        state.totalRestaurateurs = action.payload.total_restaurateurs; 
        state.totalManagers = action.payload.total_managers;
        state.totalAmountManagers = action.payload.total_amount_managers;
        
        state.best_manager_name = action.payload.best_manager_name;

        state.num_users_by_best_manager = action.payload.num_users_by_best_manager;
        state.userStatistics = action.payload.user_statistics; 
      })
      .addCase(getAllUserStatiqueData.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  },
});

export default gitUserStatiqueSlice.reducer;
