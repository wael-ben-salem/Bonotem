import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllIngCompose = createAsyncThunk("gitIngredientCompose/getAllIngCompose", async () => {
    try {
      const response = await axios.get("/ingredientsCompose");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateIngCompose = createAsyncThunk(
    "gitIngredientCompose/updateIngCompose",
    async ({ id ,formData,insertedProduitIngredient }) => {
        try {
            const response = await axios.post(`/ingredientsCompose/${id}` ,formData,insertedProduitIngredient );
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getIngComposeDetails = createAsyncThunk(
    "gitIngredientCompose/getIngComposeDetails",
    async (ingComposeId) => {
      try {
        const response = await axios.get(`/ingredientsCompose/${ingComposeId}`);
        console.log("API response:", response);
        return response.ingredientcomposes;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteIngCompose = createAsyncThunk(
    "gitIngredientCompose/deleteIngCompose",
    async (ingComposeId) => {
      try {
        const response = await axios.delete(`/produit/${ingComposeId}`);
        console.log("API response:", response);
        return ingComposeId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addIngCompose = createAsyncThunk("gitIngredientCompose/addIngCompose", async (newIngComposeData,insertedProduitIngredient,rejectWithValue) => {
    try {
      const response = await axios.post("/ingredientsCompose", newIngComposeData,insertedProduitIngredient,rejectWithValue);
      console.log("API response:", response);
      return response; // Assuming the API returns the added product data
    } catch (error) {
        console.error("API error:", error);
        return rejectWithValue(error.response); // Return error data
    }
  });
 


  
  

  export const gitIngredientComposeSlice = createSlice({
    name: "gitIngredientComposeSlice",
    initialState: {
        ingredientcomposes: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
          errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addProduit: (state, action) => {
        state.ingredientcompose.push(action.payload);
      },
      clearProduit: (state) => {
        state.ingredientcompose = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllIngCompose.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllIngCompose.fulfilled, (state, action) => {
          state.loading = false;
          state.ingredientcomposes = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllIngCompose.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateIngCompose.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateIngCompose.fulfilled, (state, action) => {
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
        })
        .addCase(updateIngCompose.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteIngCompose.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteIngCompose.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
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
        .addCase(deleteIngCompose.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addIngCompose.pending, (state) => {
          state.loading = true;
          state.error = null;
                  state.errorMessage = ""; // Reset error message

        })
        .addCase(addIngCompose.fulfilled, (state, action) => {
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
          }
        })
        .addCase(addIngCompose.rejected, (state, action) => {
          state.loading = false;
        state.error = action.payload;
 if (action.payload.validation_errors) {
          // If validation errors present, set error message accordingly
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
        } else {
          state.errorMessage = "An error occurred. Please try again."; // Generic error message
        }




        });
    },
  });

  export default gitIngredientComposeSlice.reducer;
