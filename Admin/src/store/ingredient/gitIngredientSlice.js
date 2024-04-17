import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllData = createAsyncThunk("gitIngredient/getAllData", async () => {
  try {
    const response = await axios.get("/ingredients");
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error); 
    throw error;
  }
});

export const updateIngredient = createAsyncThunk(
  "gitIngredient/updateIngredient",
  async ({ id, ingredientData }) => {
      try {
          const response = await axios.put(`/ingredients/${id}`, ingredientData);
          console.log("API response:", response);
          return response.data; 
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
      const response = await axios.get(`/ingredients/${id}`);
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



export const addIngredient = createAsyncThunk("gitIngredient/addIngredient", async (ingredientData) => {
  try {
    const response = await axios.post("/ingredients", ingredientData);
    console.log("API response:", response);
    return response.data; 
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
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
        console.log("Fulfilled payload:", action.payload); 
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Ingredient updated:", action.payload);
       
      })
      .addCase(updateIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload);
        console.log("Ingredient deleted:", action.payload);
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Ingredient added:", action.payload);
      })
      .addCase(addIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gitIngredientSlice.reducer;
