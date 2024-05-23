import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAllVenteStatiqueData = createAsyncThunk(
  "gitVenteStatique/getAllVenteStatiqueData",
  async (id) => {
    try {
      const response = await axios.get(`/statistics/${id}`);
      console.log("API response:", response);
      return response; // Return only the data from the response
    } catch (error) {
      console.error("API error:", error); // Log any errors
      throw error;
    }
  }
);

export const gitVenteStatiqueSlice = createSlice({
  name: "gitVenteStatique",
  initialState: {
    totalAchat: null,
    totalPerte:null,
    totalCout:null,
    totalMarchandise:null,

    totalVentes: null,
    meilleurProduit: null,
    quantiteProduit: null,
    maxProduitPrix: null, // Added field for produit price
    meilleurIngredient: null,
    quantiteIngredient: null,
    maxIngredientPrix: null, // Added field for ingredient price
    meilleurVenteIngProduit: null, // Added field for the best selling product or ingredient name
    meilleurtQuantiteIngProduit: null, // Added field for the best selling product or ingredient quantity
    meilleurtPrixIngProduit: null, // Added field for the best selling product or ingredient price
    ventesDetails: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenteStatiqueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVenteStatiqueData.fulfilled, (state, action) => {
        const { total_achats, total_marchandise, total_cout, total_perte, meilleur_nom, meilleur_quantite, meilleur_prixTtc, total_ventes, produit, ingredientCompose, ventes_details } = action.payload;

        state.totalAchat = total_achats;
        state.totalPerte = total_perte;
        state.totalCout = total_cout;
        state.totalMarchandise = total_marchandise;

        state.totalVentes = total_ventes;
        state.meilleurProduit = produit.meilleur_produit;
        state.quantiteProduit = produit.quantite;
        state.meilleurIngredient = ingredientCompose.meilleur_ingredient_compose;
        state.quantiteIngredient = ingredientCompose.quantite;
        state.ventesDetails = ventes_details;
        state.meilleurVenteIngProduit = meilleur_nom; // Set best selling name
        state.meilleurtQuantiteIngProduit = meilleur_quantite; // Set best selling quantity
        state.meilleurtPrixIngProduit = meilleur_prixTtc; // Set best selling price
       
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllVenteStatiqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gitVenteStatiqueSlice.reducer;
