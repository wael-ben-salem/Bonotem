import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all jours
export const getAllJours = createAsyncThunk('gitJours/getAllData', async () => {
    try {
        const response = await axios.get('/jour');
        return response; // Assuming the API returns the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// Update jour details
export const updateJour = createAsyncThunk(
    'gitJours/updateJour',
    async ({ id, jourData }) => {
        try {
            const response = await axios.put(`/updatejour/${id}`, jourData);
            return response.data; // Assuming the API returns the updated data
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Fetch jour details
export const getJourDetails = createAsyncThunk(
    'gitJours/getJourDetails',
    async (id) => {
        try {
            const response = await axios.get(`/showjour/${id}`);
            return response.data;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Delete a jour
export const deleteJour = createAsyncThunk(
    'gitJours/deleteJour',
    async (id) => {
        try {
            const response = await axios.delete(`/deletejour/${id}`);
            return id; // Return the ID to remove it from the state
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Add a new jour
export const addJour = createAsyncThunk('gitJours/addJour', async (formData) => {
    try {
        const response = await axios.post('/addjour', formData);
        return response.data; // Assuming the API returns the added data
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// Jours slice definition
export const gitJoursSlice = createSlice({
    name: 'gitJours',
    initialState: {
        jours: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearJours: (state) => {
          state.jours = [];
        },
        // Add more reducers as needed
      },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJours.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllJours.fulfilled, (state, action) => {
                state.loading = false;
                state.jours = action.payload;
                state.error = null;
            })
            .addCase(getAllJours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateJour.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateJour.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jours.findIndex(jour => jour.id === action.payload.id);
                if (index !== -1) {
                    state.jours[index] = action.payload;
                }
            })
            .addCase(updateJour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteJour.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteJour.fulfilled, (state, action) => {
                state.loading = false;
                state.jours = state.jours.filter(jour => jour.id !== action.payload);
            })
            .addCase(deleteJour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addJour.pending, (state) => {
                state.loading = true;
            })
            .addCase(addJour.fulfilled, (state, action) => {
                state.loading = false;
                state.jours.push(action.payload);
            })
            .addCase(addJour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default gitJoursSlice.reducer;
