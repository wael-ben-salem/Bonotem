import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllVenteData = createAsyncThunk("gitVente/getAllVenteData", async () => {
    try {
      const response = await axios.get("/ventes");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateVente = createAsyncThunk(
    "gitVente/updateVente",
    async ({ id, updatedVente }) => {
        try {
            const response = await axios.put(`/ventes/${id}`, updatedVente);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getVenteDetails = createAsyncThunk(
    "gitVente/getVenteDetails",
    async (id) => {
      try {
        const response = await axios.get(`/ventes/${id}`);
        console.log("API response:", response);
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteVente = createAsyncThunk(
    "gitVente/deleteVente",
    async (id) => {
      try {
        const response = await axios.delete(`/ventes/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addVente = createAsyncThunk("gitVente/addVente", async (formData) => {
    try {
      const response = await axios.post("/ventes", formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitVenteSlice = createSlice({
    name: "gitVente",
    initialState: {
        ventes: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.ventes.push(action.payload);
      },
      clearPackaging: (state) => {
        state.ventes = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllVenteData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllVenteData.fulfilled, (state, action) => {
          state.loading = false;
          state.ventes = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllVenteData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateVente.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updateVente.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Success = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Success = false; // Hide success message after 3 seconds
            }, 3000);
          }
          // You may want to update the state accordingly here
        })
        .addCase(updateVente.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(deleteVente.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(deleteVente.fulfilled, (state, action) => {
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
            }, 3000);
          }
        })
        .addCase(deleteVente.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(addVente.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addVente.fulfilled, (state, action) => {
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
            }, 3000);
          }        })
        .addCase(addVente.rejected, (state, action) => {
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

  export default gitVenteSlice.reducer;
