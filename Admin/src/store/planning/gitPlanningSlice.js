import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const getAllData = createAsyncThunk("gitPlanning/getAllData",  async () => {
  try {
    const response = await axios.get("/planning");
    return response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
}
});

export const updatePlanning = createAsyncThunk(
  "gitPlanning/updatePlanning",
  async ({ id, planningData } )=> {
    try {
      const response = await axios.put(`/planning/${id}`, planningData);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
  }
  }
);

export const deletePlanning = createAsyncThunk(
  "gitPlanning/deletePlanning",
  async (Id) => {
    try {
      const response = await axios.delete(`/deleteplanning/${Id}`);
      console.log("API response:", response);
      return Id; // Return the ID to remove it from the state
    } catch (error) {
      console.error('API error:', error);
      throw error;
  }
}
);

export const addPlanning = createAsyncThunk(
  "gitPlanning/addPlanning",
  async (planningData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/addplanning", planningData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const gitPlanningSlice = createSlice({
  name: "gitPlanning",
  initialState: {
    plannings: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.plannings = action.payload;
        state.loading = false;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePlanning.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlanning.fulfilled, (state, action) => {
        const index = state.plannings.findIndex(planning => planning.id === action.meta.arg.id);
        if (index !== -1) {
          state.plannings[index] = { ...state.plannings[index], ...action.payload };
        }
        state.loading = false;
      })
      .addCase(updatePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePlanning.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.plannings = state.plannings.filter(planning => planning.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPlanning.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlanning.fulfilled, (state, action) => {
        state.plannings.push(action.payload);
        state.loading = false;
      })
      .addCase(addPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gitPlanningSlice.reducer;
