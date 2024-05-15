import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllData = createAsyncThunk("gitCategorie/getAllUnite", async () => {
    try {
      const response = await axios.get("/categorie");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateCategorie = createAsyncThunk(
    "gitCategorie/updateCategorie",
    async ({ id, categorieData }) => {
        try {
            const response = await axios.post(`/categori/${id}`, categorieData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getCategorieeDetails = createAsyncThunk(
    "gitCategorie/getPackaging_categorieDetails",
    async (categorieId) => {
      try {
        const response = await axios.get(`/categorie/${categorieId}`);
        console.log("API response:", response);
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteCategorie = createAsyncThunk(
    "gitCategorie/deletePackaging_categorie",
    async (categorieId) => {
      try {
        const response = await axios.delete(`/categorie/${categorieId}`);
        console.log("API response:", response);
        return categorieId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addCategorie = createAsyncThunk("gitCategorie/addPackaging_categorie", async (newCategorieData) => {
    try {
      const response = await axios.post("/categori", newCategorieData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  });
  

  export const gitCategorieSlice = createSlice({
    name: "gitCategorie",
    initialState: {
        categories: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addPackaging: (state, action) => {
        state.packagings_categorie.push(action.payload);
      },
      clearPackaging: (state) => {
        state.categories = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllData.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updateCategorie.fulfilled, (state, action) => {
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
        .addCase(updateCategorie.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(deleteCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";

        })
        .addCase(deleteCategorie.fulfilled, (state, action) => {
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
        .addCase(deleteCategorie.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(addCategorie.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = ""; // Reset error message

        })
        .addCase(addCategorie.fulfilled, (state, action) => {
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
        .addCase(addCategorie.rejected, (state, action) => {
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

  export default gitCategorieSlice.reducer;
