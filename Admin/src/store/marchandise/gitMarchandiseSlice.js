import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";// Action




// Action
export const getAllMarchandise = createAsyncThunk("gitMarchandise/getAllMarchandise", async () => {
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
    "gitMarchandise/updateMarchandise",
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


  export const updateMarchandisePackaging = createAsyncThunk(
    "gitMarchandise/updateMarchandisePackaging",
    async ({ id, ingredientMarchandiseData }) => {
        try {
            const response = await axios.put(`/marchandisePackaging/${id}`, ingredientMarchandiseData);
            console.log("API response:", response);
            return response; // Assuming the API returns the updated user data
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getMarchandiseDetails = createAsyncThunk(
    "gitMarchandise/getMarchandiseDetails",
    async (produitId) => {
      try {
        const response = await axios.get(`/produit/${produitId}`);
        console.log("API response:", response);
        return response.marchandises;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteMarchandise = createAsyncThunk(
    "gitMarchandise/deleteMarchandise",
    async (marchandiseId) => {
      try {
        const response = await axios.delete(`/marchandise/${marchandiseId}`);
        console.log("API response:", response);
        return marchandiseId; // Return the ID of the deleted user
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );
  
  


  export const addMarchandise = createAsyncThunk("gitMarchandise/addMarchandise", async (formData,rejectWithValue) => {
    try {
      const response = await axios.post("/marchandiseIngredient", formData,rejectWithValue);
      console.log("API response:", response);
      return response; // Assuming the API returns the added product data
    } catch (error) {
        console.error("API error:", error);
        return rejectWithValue(error.response); // Return error data
    }
  });

  export const addMarchandisePackaging = createAsyncThunk("gitMarchandise/addMarchandisePackaging", async (formData,rejectWithValue) => {
    try {
      const response = await axios.post("/marchandisePackaging", formData,rejectWithValue);
      console.log("API response:", response);
      return response; // Assuming the API returns the added product data
    } catch (error) {
        console.error("API error:", error);
        return rejectWithValue(error.response); // Return error data
    }
  });
 


  
  

  export const gitMarchandiseSlice = createSlice({
    name: "gitMarchandiseSlice",
    initialState: {
        marchandises: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
          errorMessage: "", // Add a state to store error message
          erroredMessage: "", // Add a state to store error message

          successed: false, // Add this state for success message


    },
    reducers: {
      addProduit: (state, action) => {
        state.marchandises.push(action.payload);
      },
      clearProduit: (state) => {
        state.marchandises = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllMarchandise.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllMarchandise.fulfilled, (state, action) => {
          state.loading = false;
          state.marchandises = action.payload;
          state.error = null;
          console.log("Fulfilled payload:", action.payload);
        })
        .addCase(getAllMarchandise.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateMarchandiseingredient.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";
        })
        .addCase(updateMarchandiseingredient.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Successed = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Successed = false; // Hide success message after 3 seconds
            }, 3000);
          }        })
        .addCase(updateMarchandiseingredient.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.erroredMessage = "An error occurred. Please try again.";

          }
        })

        .addCase(updateMarchandisePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";
        })
        .addCase(updateMarchandisePackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Successed = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Successed = false; // Hide success message after 3 seconds
            }, 3000);
          }        })
        .addCase(updateMarchandisePackaging.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.erroredMessage = "An error occurred. Please try again.";

          }
        })

        .addCase(deleteMarchandise.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";
        })
        .addCase(deleteMarchandise.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Successed = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Successed = false; // Hide success message after 3 seconds
            }, 3000);
          }    
        })
        .addCase(deleteMarchandise.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.erroredMessage = "An error occurred. Please try again.";

          }
        })

        .addCase(addMarchandisePackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";

        })
        .addCase(addMarchandisePackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Successed = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Successed = false; // Hide success message after 3 seconds
            }, 3000);
          }        })
        .addCase(addMarchandisePackaging.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.erroredMessage = "An error occurred. Please try again.";

          }
        })



        .addCase(addMarchandise.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.erroredMessage = "";

        })
        .addCase(addMarchandise.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          
          // Optionally, you can update state with the newly added user
         
          if (action.payload.validation_errors) {
            // If validation errors present, set error message accordingly
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];
          } else {
            state.Successed = true; // Set showSuccessMessage to true
            setTimeout(() => {
              state.Successed = false; // Hide success message after 3 seconds
            }, 3000);
          }        })
        .addCase(addMarchandise.rejected, (state, action) => {
          state.loading = false;
          if (action.payload && action.payload.validation_errors) {
            state.erroredMessage = Object.values(action.payload.validation_errors)[0][0];

          } else {
         state.erroredMessage = "An error occurred. Please try again.";

          }
        });
    }, 
  });

  export default gitMarchandiseSlice.reducer;
