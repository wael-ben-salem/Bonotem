import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions for managing types of personnel
export const fetchTypePersonnel = createAsyncThunk(
  "gitTypePersonnel/fetchTypePersonnel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/type_personnel/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addTypePersonnel = createAsyncThunk(
  "gitTypePersonnel/addTypePersonnel",
  async ({id, personnelData,  rejectWithValue }) => {
    try {
      const response = await axios.post(`/addtype_personnel/${id}`, personnelData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTypePersonnel = createAsyncThunk(
  "gitTypePersonnel/updateTypePersonnel",
  async ({ id, personnelData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/updatetype_Personnel/${id}`, personnelData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTypePersonnel = createAsyncThunk(
  "gitTypePersonnel/deleteTypePersonnel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/deletetype_personnel/${id}`);
      return id;  // return id to identify which item was deleted
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for managing types of personnel with the naming convention 'gitTypePersonnel'
const gitTypePersonnelSlice = createSlice({
  name: "gitTypePersonnel",
  initialState: {
    typePersonnels: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypePersonnel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTypePersonnel.fulfilled, (state, action) => {
        state.typePersonnels  = action.payload;
        state.loading = false;
      })
      .addCase(fetchTypePersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTypePersonnel.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTypePersonnel.fulfilled, (state, action) => {
        state.personnel.push(action.payload);
        state.loading = false;
      })
      .addCase(addTypePersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTypePersonnel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTypePersonnel.fulfilled, (state, action) => {
        const index = state.personnel.findIndex(pers => pers.id === action.meta.arg.id);
        if (index !== -1) {
          state.personnel[index] = { ...state.personnel[index], ...action.payload };
        }
        state.loading = false;
      })
      .addCase(updateTypePersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTypePersonnel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTypePersonnel.fulfilled, (state, action) => {
        state.personnel = state.personnel.filter(pers => pers.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTypePersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gitTypePersonnelSlice.reducer;
