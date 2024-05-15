import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllMarchandiseData = createAsyncThunk("gitMarchandiseIngredient/getAllMarchandiseData", async () => {
    try {
      const response = await axios.get("/marchandise");
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  });


  export const updateMarchandiseingredient = createAsyncThunk(
    "gitMarchandiseIngredient/updateMarchandiseingredient",
    async ({ id, ingredientMarchandiseData }) => {
        try {
            const response = await axios.put(`/marchandiseIngredient/${id}`, ingredientMarchandiseData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getAllMarchandiseIngredient = createAsyncThunk(
    "gitMarchandiseIngredient/getAllMarchandise",
    async (id) => {
      try {
        const response = await axios.get(`/marchandise/${id}`);
        console.log("API response:", response);
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteMarchandise = createAsyncThunk(
    "gitMarchandiseIngredient/deleteMarchandise",
    async (id) => {
      try {
        const response = await axios.delete(`/marchandise/${id}`);
        console.log("API response:", response);
        return id; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addMarchandiseIngredient = createAsyncThunk("gitMarchandiseIngredient/addMarchandiseIngredient", async (formData) => {
    try {
      const response = await axios.post("/marchandiseIngredient", formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error(error);
      throw error;

    }
  });
  

  export const gitMarchandiseIngredientSlice = createSlice({
    name: "gitMarchandiseIngredient",
    initialState: {
        marchandisesingredient: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addMarchandiseIngredient: (state, action) => {
        state.marchandisesingredient.push(action.payload);
      },
      clearPackaging: (state) => {
        state.marchandisesingredient = [];
      },
      // Add more reducers as needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllMarchandiseData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllMarchandiseData.fulfilled, (state, action) => {
          state.loading = false;
          state.marchandisesingredient = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllMarchandiseData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateMarchandiseingredient.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updateMarchandiseingredient.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          if (action.payload && action.payload.validation_errors) {
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
        .addCase(updateMarchandiseingredient.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          }
        })
        .addCase(deleteMarchandise.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(deleteMarchandise.fulfilled, (state, action) => {
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
        .addCase(deleteMarchandise.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.errorMessage = "An error occurred. Please try again.";

          }
        })
        .addCase(addMarchandiseIngredient.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.errorMessage = ""; // Reset error message
  
          })
          .addCase(addMarchandiseIngredient.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            
            // Optionally, you can update state with the newly added user
           
            if (action.payload && action.payload.validation_errors) {
              // If validation errors present, set error message accordingly
              state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
            } else {
              state.Success = true; // Set showSuccessMessage to true
              setTimeout(() => {
                state.Success = false; // Hide success message after 3 seconds
              }, 3000);
            }        })
          .addCase(addMarchandiseIngredient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            if (action.payload && action.payload.validation_errors) {
              // If validation errors present, set error message accordingly
              state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
            } else {
                state.errorMessage = "An error occurred. Please try again.";
            }
          });
      
    },
  });

  export default gitMarchandiseIngredientSlice.reducer;
