import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllPackaging = createAsyncThunk("gitPackaging/getAllData", async (id) => {
    try {
      const response = await axios.get(`/packaging/${id}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updatePackaging = createAsyncThunk(
    "gitPackagingr/updatePackaging",
    async ({ id, packagingData }) => {
        try {
            const response = await axios.post(`/updatepackaging/${id}`, packagingData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getPackagingDetails = createAsyncThunk(
    "gitPackaging/getPackagingDetails",
    async (packagingId) => {
      try {
        const response = await axios.get(`/packagingshow/${packagingId}`);
        console.log("API response:", response);
        return response.packagings;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deletePackaging = createAsyncThunk(
    "gitPackaging/deletePackaging",
    async (packagingId) => {
      try {
        const response = await axios.delete(`/deletepackaging/${packagingId}`);
        console.log("API response:", response);
        return packagingId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addPackaging = createAsyncThunk(
    "gitPackaging/addPackaging",
    async ({ id, formData }) => {
      try {
        const response = await axios.post(`/addpackaging/${id}`, formData);
        console.log("API response:", response);
        return response; // Assuming the API returns the added user data
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  

  export const gitPackagingSlice = createSlice({
    name: "gitPackging",
    initialState: {
      packagings: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
     errorMessage: "", // Add a state to store error message

    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings.push(action.payload);
      },
      clearPackaging: (state) => {
        state.packagings = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllPackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllPackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.packagings = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllPackaging.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updatePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updatePackaging.fulfilled, (state, action) => {
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
        .addCase(updatePackaging.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(deletePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";
        })
        .addCase(deletePackaging.fulfilled, (state, action) => {
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
          }    
        })
        .addCase(deletePackaging.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(addPackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message
  
        })
        .addCase(addPackaging.fulfilled, (state, action) => {
          state.loading = false;
        state.error = null;
        
        // Optionally, you can update state with the newly added user
       
        if (action.payload.validation_errors) {
          // If validation errors present, set error message accordingly
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
        } else {
          state.Success = true; // Set showSuccessMessage to true
          setTimeout(() => {
            state.Success= false; // Hide success message after 3 seconds
          }, 2000);
        }        
      }).addCase(addPackaging.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.validation_errors) {
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

        } else {
       state.errorMessage = "An error occurred. Please try again.";

        }
      });
    },
  });

  export default gitPackagingSlice.reducer;
