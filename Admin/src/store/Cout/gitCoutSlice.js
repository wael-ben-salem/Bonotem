import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllCoutData = createAsyncThunk("gitCout/getAllCoutData", async (id) => {
    try {
      const response = await axios.get(`/couts/${id}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateCout = createAsyncThunk(
    "gitCout/updateCout",
    async ({ id, updatedCout }) => {
        try {
            const response = await axios.put(`/updatecouts/${id}`, updatedCout);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getCoutDetails = createAsyncThunk(
    "gitCout/getCoutDetails",
    async (id) => {
      try {
        const response = await axios.get(`/showcouts/${id}`);
        console.log("API response:", response);
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteCout = createAsyncThunk(
    "gitCout/deleteCout",
    async (id) => {
      try {
        const response = await axios.delete(`/couts/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addCout = createAsyncThunk("gitCout/addCout", async ({id,formData}) => {
    try {
      const response = await axios.post(`/couts/${id}`, formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitCoutSlice = createSlice({
    name: "gitCout",
    initialState: {
        couts: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addCout: (state, action) => {
        state.couts.push(action.payload);
      },
      clearCout: (state) => {
        state.couts = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllCoutData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllCoutData.fulfilled, (state, action) => {
          state.loading = false;
          state.couts = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllCoutData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateCout.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updateCout.fulfilled, (state, action) => {
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
        .addCase(updateCout.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(deleteCout.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";

        })
        .addCase(deleteCout.fulfilled, (state, action) => {
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
        .addCase(deleteCout.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(addCout.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addCout.fulfilled, (state, action) => {
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
        .addCase(addCout.rejected, (state, action) => {
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

  export default gitCoutSlice.reducer;
