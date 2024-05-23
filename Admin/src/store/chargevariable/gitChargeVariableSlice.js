import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllChargeVariable = createAsyncThunk("gitChargeVariable/getChargeVariable", async (id) => {
    try {
      const response = await axios.get(`/charges/${id}/all`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateChargeVariable = createAsyncThunk(
    "gitChargeVariable/updateChargeVariable",
    async ({ id, ChargeVarialble }) => {
        try {
            const response = await axios.put(`/updatecharges/${id}`, ChargeVarialble);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getChargeVariableDetails = createAsyncThunk(
    "gitChargeVariable/getChargeVariableDetails",
    async (id) => {
      try {
        const response = await axios.get(`/showcharges/${id}`);
        console.log("API response:", response);
        return response.categories;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteChargeVariable = createAsyncThunk(
    "gitChargeVariable/deleteChargeVariable",
    async (id) => {
      try {
        const response = await axios.delete(`/charges/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addChargeVariable = createAsyncThunk("gitChargeVariable/addChargeVariable", async ({id, formData}) => {
    try {
      const response = await axios.post(`/charges/${id}`, formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitChargeVariableSlice = createSlice({
    name: "gitChargeVariable",
    initialState: {
        chargesvariables: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.addChargeVariable.push(action.payload);
      },
      clearPackaging: (state) => {
        state.chargesvariables = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllChargeVariable.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllChargeVariable.fulfilled, (state, action) => {
          state.loading = false;
          state.chargesvariables = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllChargeVariable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateChargeVariable.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateChargeVariable.fulfilled, (state, action) => {
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
        .addCase(updateChargeVariable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteChargeVariable.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteChargeVariable.fulfilled, (state, action) => {
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
        .addCase(deleteChargeVariable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addChargeVariable.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addChargeVariable.fulfilled, (state, action) => {
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
        .addCase(addChargeVariable.rejected, (state, action) => {
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

  export default gitChargeVariableSlice.reducer;
