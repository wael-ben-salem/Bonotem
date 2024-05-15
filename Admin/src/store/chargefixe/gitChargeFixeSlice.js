import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all charges fixes
export const fetchChargesFixes = createAsyncThunk('gitchargefixe/getAllData', async () => {
    try {
        const response = await axios.get('/charge_fixe');
        return response; 
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// Update charge fixe details
export const updateChargeFixe = createAsyncThunk(
    'chargesFixes/updateChargeFixe',
    async ({ id, chargeData }) => {
        try {
            const response = await axios.put(`/updatecharge_fixe/${id}`, chargeData);
            return response.data; // Assuming the API returns the updated data
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
);

// Delete charge fixe
export const deleteChargeFixe = createAsyncThunk(
    'chargesFixes/deleteChargeFixe',
    async (Id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/deletecharge_fixe/${Id}`);
            if (response.status === 200) {
                return Id;  // Assuming the API sends a 200 OK on success
            } else {
                return rejectWithValue('Failed to delete charge fixe');
            }
        } catch (error) {
            console.error('API error:', error);
            return rejectWithValue('Failed to delete charge fixe');
        }
    }
);

// Add new charge fixe
export const addChargeFixe = createAsyncThunk('chargesFixes/addChargeFixe', async (formData) => {
    try {
        const response = await axios.post('/addcharge_fixe', formData);
        console.log("API response:", response);
        return response.data; // Assuming the API returns the added data
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
});

// ChargesFixes slice definition
export const gitChargeFixeSlice = createSlice({
    name: 'chargesFixes',
    initialState: {
        chargesFixes: [],
        loading: false,
        error: null,
        Success: false,
    errorMessage: ''
       
    },
    reducers: {
        clearChargesFixes: (state) => {
            state.chargesFixes = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChargesFixes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChargesFixes.fulfilled, (state, action) => {
                state.loading = false;
                state.chargesFixes = action.payload; // Update chargesFixes array
            })
            .addCase(fetchChargesFixes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateChargeFixe.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateChargeFixe.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.chargesFixes.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.chargesFixes[index] = action.payload;
                }
            })
            .addCase(updateChargeFixe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteChargeFixe.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteChargeFixe.fulfilled, (state, action) => {
                state.loading = false;
                state.Success = true;  // Ensure this is correctly set
                state.chargesFixes = state.chargesFixes.filter(charge => charge.id !== action.payload);
                state.errorMessage = '';  // Clear any previous error messages
            })
            .addCase(deleteChargeFixe.rejected, (state, action) => {
                state.loading = false;
                state.Success = false; 
                state.errorMessage = 'Failed to delete charge fixe'; 
            })
            .addCase(addChargeFixe.pending, (state) => {
                state.loading = true;
            })
            .addCase(addChargeFixe.fulfilled, (state, action) => {
                state.loading = false;
                state.chargesFixes.push(action.payload);
            })
            .addCase(addChargeFixe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default gitChargeFixeSlice.reducer;
