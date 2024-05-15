import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllData = createAsyncThunk("gitUser/getAllData", async () => {
  try {
    const response = await axios.get("/user");
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error); // Log any errors
    throw error;
  }
});


export const updateUser = createAsyncThunk(
  "gitUser/updateUser",
  async ({ id, userupdate }) => {
      try {
          const response = await axios.post(`/usersupdate/${id}`, userupdate);
          console.log("API response:", response);
          return response; // Assuming the API returns the updated user data
      } catch (error) {
          console.error("API error:", error);
          throw error;
      }
  }
);



export const updateManagerUser = createAsyncThunk(
  "gitUser/updateManagerUser",
  async ({ id, userData }) => {
      try {
          const response = await axios.post(`/usersmanagerupdate/${id}`, userData);
          console.log("API response:", response);
          return response; // Assuming the API returns the updated user data
      } catch (error) {
          console.error("API error:", error);
          throw error;
      }
  }
);




export const getUserDetails = createAsyncThunk(
  "gitUser/getUserDetails",
  async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
);




export const deleteUser = createAsyncThunk(
  "gitUser/deleteUser",
  async (userId) => {
    try {
      const response = await axios.delete(`/deleteuser/${userId}`);
      console.log("API response:", response);
      return userId; // Return the ID of the deleted user
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
);


export const addUser = createAsyncThunk("gitUser/addUser", async ({ formData, id }) => {
  try {
    const response = await axios.post(`/adduser/${id}`, formData,id);
    console.log("API response:", response);
    return response; // Assuming the API returns the added user data
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
});



export const addManagerUser = createAsyncThunk("gitUser/addManagerUser", async ({ formData, id }) => {
  try {
    const response = await axios.post(`/addmanageruser/${id}`, formData,id);
    console.log("API response:", response);
    return response; // Assuming the API returns the added user data
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
});






export const gitUserSlice = createSlice({
  name: "gitUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
    Success: false, // Add this state for success message
      errorMessage: "", 
  },
  reducers: {
    // Define your additional reducers here
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
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
        state.users = action.payload; // Update users array
        state.error = null;
        console.log("Fulfilled payload:", action.payload); // Log fulfilled payload
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = "";

      })
      .addCase(updateUser.fulfilled, (state, action) => {
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
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.validation_errors) {
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

        } else {
       state.errorMessage = "An error occurred. Please try again.";

        }
      })


      .addCase(updateManagerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = "";

      })
      .addCase(updateManagerUser.fulfilled, (state, action) => {
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
      .addCase(updateManagerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.validation_errors) {
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];

        } else {
       state.errorMessage = "An error occurred. Please try again.";

        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
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
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = ""; // Reset error message

      })
      .addCase(addUser.fulfilled, (state, action) => {
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
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (action.payload.validation_errors) {
          // If validation errors present, set error message accordingly
          state.errorMessage = Object.values(action.payload.validation_errors)[0][0];
        } else {
          state.errorMessage = "An error occurred. Please try again."; // Generic error message
        }
      })
      .addCase(addManagerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = ""; // Reset error message

      })
      .addCase(addManagerUser.fulfilled, (state, action) => {
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
      .addCase(addManagerUser.rejected, (state, action) => {
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

export default gitUserSlice.reducer;
