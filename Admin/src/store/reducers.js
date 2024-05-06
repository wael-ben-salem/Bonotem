import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Calendar
import calendar from "./calendar/reducer";

// Authentication
import forgetPassword from "./auth/forgetpwd/reducer";
import login from "./auth/login/reducer";
import profile from "./auth/profile/reducer";
import account from "./auth/register/reducer";
import gitUserReducer from "./user/gitUserSlice"; // Import your gitUserReducer from its file
import gitPackagingReducer from "./Packagings/gitPackagingSlice"; 
import gitPackagingCategorieReducer from "./Packagings/gitPackagingCategorie"; 
import gitCategorieReducer from "./categorie/gitCategorySlice";
import gitProduitReducer from "./produit/gitProduitSlice";
import gitIngredientReducer from "./ingredient/GitIngredientSlice";
import gitUniteReducer from "./Unite/gitUniteSlice";
import gitMarchandiseReducer from "./marchandise/gitMarchandiseSlice";
import gitFournisseurReducer from "./fournisseur/gitFournisseurSlice";
import gitIngredientComposeReducer from "./ingredient/GitIngredientComposerSlice";
import gitCarteReducer from "./carte/gitCarteSlice";


import AdminTable from "./auth/Tables/reducer";






const rootReducer = combineReducers({
  // public
  Layout,
   
  calendar,
  forgetPassword,
  login,
  profile,
  account,
  gitPackaging: gitPackagingReducer,
  gitPackagingCategorie: gitPackagingCategorieReducer,
  gitCategory: gitCategorieReducer,
  gitProduit:gitProduitReducer,
  gitIngredient:gitIngredientReducer,
  gitUnite:gitUniteReducer,
  gitMarchandise:gitMarchandiseReducer,
  gitFournisseur:gitFournisseurReducer,
  gitIngredientCompose:gitIngredientComposeReducer,
  gitCarte:gitCarteReducer,



  gitUser: gitUserReducer, // Assign gitUserReducer to the key 'gitUser'
  AdminTable,
  
});

export default rootReducer;
