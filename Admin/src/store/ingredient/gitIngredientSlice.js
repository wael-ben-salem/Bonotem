import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllDataIngredient = createAsyncThunk("gitIngredient/getAllData", async (id) => {
  try {
    const response = await axios.get(`/ingredients/${id}`);
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error); 
    throw error;
  }
});

export const updateingredient = createAsyncThunk(
  "gitIngredient/updateIngredient",
  async ({ id, ingredientData }) => {
      try {
          const response = await axios.post(`/ingredientsupdate/${id}`, ingredientData);
          console.log("API response:", response);
          return response; 
      } catch (error) {
          console.error("API error:", error);
          throw error;
      }
  }
);


export const getIngredientDetails = createAsyncThunk(
  "gitIngredient/getIngredientDetails",
  async (id) => {
    try {
      const response = await axios.get(`/ingredientsshow/${id}`);
      console.log("API response:", response);
      return response.data.ingredients;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
);




export const deleteIngredient = createAsyncThunk(
  "gitIngredient/deleteIngredient",
  async (id) => {
    try {
      const response = await axios.delete(`/ingredients/${id}`);
      console.log("API response:", response);
      return id; 
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
);



export const addIngredient = createAsyncThunk("gitIngredient/addIngredient", async ({ id, newIngredientData }) => {
  try {
    const response = await axios.post(`/ingredients/${id}`, newIngredientData);
    console.log("API response:", response);
    return response; // Assuming the API returns the added ingredient data
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
});






export const gitIngredientSlice = createSlice({
  name: "gitIngredient",
  initialState: {
    ingredients: [],
    loading: false,
    error: null,
    Success: false, // Add this state for success message
     errorMessage: "", // Add a state to store error message

  },
  reducers: {
    
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDataIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
        console.log("Fulfilled payload:", action.payload); 
      })
      .addCase(getAllDataIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateingredient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = "";
      })
      .addCase(updateingredient.fulfilled, (state, action) => {
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
            }, 2000);}
          })
      .addCase(updateingredient.rejected, (state, action) => {
        state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
      .addCase(deleteIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.erroredMessage = "";
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
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
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
      .addCase(addIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = ""; // Reset error message

      })
      .addCase(addIngredient.fulfilled, (state, action) => {
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
        }        })
      .addCase(addIngredient.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.validation_errors) {
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

        } else {
       state.errorMessage = "An error occurred. Please try again.";

        }
      });
  },
});

export default gitIngredientSlice.reducer;
