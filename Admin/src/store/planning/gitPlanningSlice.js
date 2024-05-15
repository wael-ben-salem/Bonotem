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

/*export const updatePlanning = createAsyncThunk(
  "gitPlanning/updatePlanning",
  async ({ id, planningData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/updateplanning/${id}`, planningData); // Replace ${id} with the actual ID value
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);*/
// Update personnel details
export const updatePlanning = createAsyncThunk(
  'gitPlanning/updatePlanning',
  async ({ id, planningData }) => {
      try {
          const response = await axios.put(`/updateplanning/${id}`, planningData);
          return response.data; // Assuming the API returns the updated data
      } catch (error) {
          console.error('API error:', error);
          throw error;
      }
  }
);
export const deletePlanning = createAsyncThunk(
  "gitPlanning/deletePlanning",
  async (Id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/deleteplanning/${Id}`);
      console.log("Deletion successful:", response);
      return Id; 
    } catch (error) {
      console.error('Deletion API error:', error);
      return rejectWithValue(error.response);
    }
  }
);
export const deleteAllPlanningsForPersonnel = createAsyncThunk(
  "gitPlanning/deleteAllPlanningsForPersonnel",
  async (personnelId) => {
    try {
      const response = await axios.delete(`/planning/personnel/${personnelId}`);
      console.log("API response:", response);
      return personnelId; 
  } catch (error) {
      console.error('API error:', error);
      throw error;
  }
}
);
export const updateAllPlanningsForPersonnel = createAsyncThunk(
  "gitPlanning/updateAllPlanningsForPersonnel",
  async ({ personnelId, planningData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/planning/personnel/${personnelId}`, planningData);
      return response;  
    } catch (error) {
      return rejectWithValue(error.response);
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
        state.plannings = state.plannings.map(planning =>
          planning.id === action.payload.id ? action.payload : planning
        );
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
      .addCase(deleteAllPlanningsForPersonnel.fulfilled, (state, action) => {
        state.plannings = state.plannings.filter(planning => planning.personnel_id !== action.payload);
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
      }).addCase(updateAllPlanningsForPersonnel.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(updateAllPlanningsForPersonnel.fulfilled, (state, action) => {
        state.plannings = state.plannings.map(planning => 
          planning.personnel_id === action.meta.arg.personnelId &&
          planning.jour_id === action.meta.arg.planningData.jour_id 
            ? {...planning, ...action.payload} : planning
        );
        state.loading = false;
      })
      .addCase(updateAllPlanningsForPersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  },
});

export default gitPlanningSlice.reducer;
