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
  async ({ id, userData }) => {
      try {
          const response = await axios.put(`/usersupdate/${id}`, userData);
          console.log("API response:", response);
          return response.data; // Assuming the API returns the updated user data
      } catch (error) {
          console.error("API error:", error);
          throw error;
      }
  }
);





export const gitUserSlice = createSlice({
  name: "gitUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("User updated:", action.payload);
        // You may want to update the state accordingly here
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, clearUsers } = gitUserSlice.actions;
export default gitUserSlice.reducer;
