import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllChargeFixe = createAsyncThunk("gitChargeFixe/getChargeFixe", async (id) => {
    try {
      const response = await axios.get(`/charge_fixe/${id}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateChargeFixe = createAsyncThunk(
    "gitChargeFixe/updateChargeFixe",
    async ({ id, ChargeFixe }) => {
        try {
            const response = await axios.put(`/updatecharge_fixe/${id}`, ChargeFixe);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getChargeFixeDetails = createAsyncThunk(
    "gitChargeFixe/getChargeFixeDetails",
    async (id) => {
      try {
        const response = await axios.get(`/showcharge_fixe/${id}`);
        console.log("API response:", response);
        return response.categories;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteChargeFixe = createAsyncThunk(
    "gitChargeFixe/deleteChargeFixe",
    async (id) => {
      try {
        const response = await axios.delete(`/deletecharge_fixe/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addChargeFixe = createAsyncThunk("gitChargeFixe/addChargeFixe", async ({id, formData}) => {
    try {
      const response = await axios.post(`/addcharge_fixe/${id}`, formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitChargeFixeSlice = createSlice({
    name: "gitChargeFixe",
    initialState: {
        chargesfixes: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.addChargeFixe.push(action.payload);
      },
      clearPackaging: (state) => {
        state.chargesfixes = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllChargeFixe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllChargeFixe.fulfilled, (state, action) => {
          state.loading = false;
          state.chargesfixes = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllChargeFixe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateChargeFixe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateChargeFixe.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Success = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Success = false; // Hide success message after 3 seconds
            }, 2000);
          }
          // You may want to update the state accordingly here
        })
        .addCase(updateChargeFixe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteChargeFixe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteChargeFixe.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Remove the deleted user from the state
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.errorMessage = "Object.values(action.payload.validation_errors)[0][0]";
          } else {
            state.Success = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Success = false; // Hide success message after 3 seconds
            }, 2000);
          }
        })
        .addCase(deleteChargeFixe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addChargeFixe.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addChargeFixe.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Success = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Success = false; // Hide success message after 3 seconds
            }, 2000);
          }        })
        .addCase(addChargeFixe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.errorMessage = "An error occurred. Please try again."; // Generic error message
            }
        });
    },
  });

  export default gitChargeFixeSlice.reducer;
