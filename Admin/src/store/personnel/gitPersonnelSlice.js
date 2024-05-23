import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all personnel
export const getAllPersonnel = createAsyncThunk('gitPersonnel/getAllData', async (id) => {
    try {
        const response = await axios.get(`/personnel/${id}`);
        return response; 
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// Update personnel details
export const updatePersonnel = createAsyncThunk(
    'gitPersonnel/updatePersonnel',
    async ({ id, personnelData }) => {
        try {
            const response = await axios.put(`/updatepersonnel/${id}`, personnelData);
            return response.data; // Assuming the API returns the updated data
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Fetch personnel details
export const getPersonnelDetails = createAsyncThunk(
    'gitPersonnel/getPersonnelDetails',
    async (Id) => {
        try {
            const response = await axios.get(`/showpersonnel/${Id}`);
            return response;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Delete personnel
export const deletePersonnel = createAsyncThunk(
    'gitPersonnel/deletePersonnel',
    async (Id) => {
        try {
            const response = await axios.delete(`/deletepersonnel/${Id}`);
            console.log("API response:", response);
            return Id; // Return the ID to remove it from the state
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);
export const OverViewData = createAsyncThunk('gitPersonnel/fetchSalaries', async (period) => {
    try {
        const response = await axios.get(`/salaries?groupBy=${period}`);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// Add new personnel
export const addPersonnel = createAsyncThunk(
    'gitPersonnel/addPersonnel',
    async ({ id, newPersonnelData }) => {
      try {
        const response = await axios.post(`/addpersonnel/${id}`, newPersonnelData);
        console.log("API response:", response);
        return response; // Assuming the API returns the added data
      } catch (error) {
        console.error('API error:', error);
        throw error;
      }
    }
  );
  

// Personnel slice definition
export const gitPersonnelSlice = createSlice({
    name: 'gitPersonnel',
    initialState: {
        //typePersonnels: [],
        personnel: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Define your additional reducers here
        addPersonnel: (state, action) => {
          state.personnel.push(action.payload);
        },
        clearPersonnel: (state) => {
          state.personnel = [];
        },
        // Add more reducers as needed
      },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPersonnel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPersonnel.fulfilled, (state, action) => {
                state.loading = false;
                state.personnel = action.payload; // Update personnel array
                state.error = null;
            })
            .addCase(getAllPersonnel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updatePersonnel.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePersonnel.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.personnel.findIndex(p => p.peronnel_id === action.payload.personnel_id);
                if (index !== -1) {
                    state.personnel[index] = action.payload;
                }
            })
            .addCase(updatePersonnel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletePersonnel.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePersonnel.fulfilled, (state, action) => {
                state.loading = false;
                state.personnel = state.personnel.filter(personnel => personnel.id !== action.payload);
            })
            .addCase(deletePersonnel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addPersonnel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPersonnel.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                console.log("Personnel added:", action.payload);
            })
            .addCase(addPersonnel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default gitPersonnelSlice.reducer;
