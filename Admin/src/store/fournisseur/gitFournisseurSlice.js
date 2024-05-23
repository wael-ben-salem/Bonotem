import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllFournisseur = createAsyncThunk("gitFournisseur/getAllUnite", async (id) => {
    try {
      const response = await axios.get(`/fournisseurs/${id}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateFournisseur = createAsyncThunk(
    "gitFournisseur/updateFournisseur",
    async ({ id, fournisseurData }) => {
        try {
            const response = await axios.post(`/updatefournisseurs/${id}`, fournisseurData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getFournisseureDetails = createAsyncThunk(
    "gitFournisseur/getPackaging_FournisseurDetails",
    async (fournisseurId) => {
      try {
        const response = await axios.get(`/fournisseursshow/${fournisseurId}`);
        console.log("API response:", response);
        return response.categories;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteFournisseur = createAsyncThunk(
    "gitFournisseur/deletePackaging_Fournisseur",
    async (id) => {
      try {
        const response = await axios.delete(`/fournisseurs/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addFournisseur = createAsyncThunk("gitFournisseur/addPackaging_Fournisseur", async ({id, formData}) => {
    try {
      const response = await axios.post(`/fournisseurs/${id}`, formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitFournisseurSlice = createSlice({
    name: "gitFournisseur",
    initialState: {
        fournisseurs: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings_fournisseur.push(action.payload);
      },
      clearPackaging: (state) => {
        state.fournisseurs = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllFournisseur.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllFournisseur.fulfilled, (state, action) => {
          state.loading = false;
          state.fournisseurs = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllFournisseur.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateFournisseur.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateFournisseur.fulfilled, (state, action) => {
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
        .addCase(updateFournisseur.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteFournisseur.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteFournisseur.fulfilled, (state, action) => {
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
        .addCase(deleteFournisseur.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addFournisseur.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addFournisseur.fulfilled, (state, action) => {
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
        .addCase(addFournisseur.rejected, (state, action) => {
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

  export default gitFournisseurSlice.reducer;
