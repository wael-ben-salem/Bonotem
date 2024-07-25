import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const getAllMarchandiseData = createAsyncThunk("gitMarchandisePackaging/getAllMarchandiseData", async (id) => {
    try {
      const response = await axios.get(`/marchandise/${id}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error); 
      throw error;
    }
  });


  export const updateMarchandisepackaging = createAsyncThunk(
    "gitMarchandisePackaging/updateMarchandisepackaging",
    async ({ id, packagingMarchandiseData }) => {
        try {
            const response = await axios.put(`/updatemarchandisePackaging/${id}`, packagingMarchandiseData);
            console.log("API response:", response);
            return response; 
        } catch (error) {
            console.error("API error:", error);
            throw error;
        }
    }
  );


  export const getAllMarchandisePackaging = createAsyncThunk(
    "gitMarchandisePackaging/getAllMarchandisePackaging",
    async (id) => {
      try {
        const response = await axios.get(`/showmarchandise/${id}`);
        console.log("API response:", response);
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  );

  export const deleteMarchandise = createAsyncThunk(
    "gitMarchandisePackaging/deleteMarchandise",
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
  
  


  export const addMarchandisePackaging = createAsyncThunk("gitMarchandisePackaging/addMarchandisePackaging", async ({id, formData}) => {
    try {
      const response = await axios.post(`/marchandisePackaging/${id}`, formData);
      console.log("API response:", response);
      return response; // Assuming the API returns the added user data
    } catch (error) {
      console.error(error);
      throw error;

    }
  });
  

  export const gitMarchandisePackagingSlice = createSlice({
    name: "gitMarchandisePackaging",
    initialState: {
        marchandisespackaging: [],
      loading: false,
      error: null,
      Success: false, // Add this state for success message
      errorMessage: "", // Add a state to store error message


    },
    reducers: {
      // Define your additional reducers here
      addMarchandisePackaging: (state, action) => {
        state.marchandisespackaging.push(action.payload);
      },
      clearPackaging: (state) => {
        state.marchandisespackaging = [];
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
          state.marchandisespackaging = action.payload; // Update users array
          state.error = null;
          console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
        })
        .addCase(getAllMarchandiseData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateMarchandisepackaging.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.errorMessage = "";

        })
        .addCase(updateMarchandisepackaging.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          if (action.payload && action.payload.validation_errors) {
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
        .addCase(updateMarchandisepackaging.rejected, (state, action) => {
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
            }, 2000);
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
        .addCase(addMarchandisePackaging.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.errorMessage = ""; // Reset error message
  
          })
          .addCase(addMarchandisePackaging.fulfilled, (state, action) => {
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
              }, 2000);
            }        })
          .addCase(addMarchandisePackaging.rejected, (state, action) => {
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

  export default gitMarchandisePackagingSlice.reducer;
