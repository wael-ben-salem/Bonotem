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
import gitUserStatiqueReducer from "./user/gitUserStatitqueSlice"; // Import your gitUserReducer from its file


import gitPackagingReducer from "./Packagings/gitPackagingSlice"; 
import gitPackagingCategorieReducer from "./Packagings/gitPackagingCategorie"; 
import gitCategorieReducer from "./categorie/gitCategorySlice";
import gitProduitReducer from "./produit/gitProduitSlice";
<<<<<<< HEAD
import gitIngredientReducer from "./ingredient/gitIngredientSlice";
import gitPlanningReducer from "./planning/gitPlanningSlice";
import gitPersonnelReducer from "./personnel/gitPersonnelSlice";
import gitTypePersonnelReducer from "./typepersonnel/gitTypePersonnelSlice";
import gitChargeFixeReducer from './chargefixe/gitChargeFixeSlice';
import gitJourReducer from "./jour/gitJourSlice";
=======
import gitIngredientReducer from "./ingredient/GitIngredientSlice";
import gitUniteReducer from "./Unite/gitUniteSlice";
import gitMarchandiseIngredientReducer from "./marchandise/gitMarchandiseIngredientSlice";
import gitMarchandisePackagingReducer from "./marchandise/gitMarchandisePackagingSlice";

import gitFournisseurReducer from "./fournisseur/gitFournisseurSlice";
import gitIngredientComposeReducer from "./ingredient/GitIngredientComposerSlice";
import gitCarteReducer from "./carte/gitCarteSlice";
import gitPerteReducer from "./perte/gitPerteSlice";

import gitCoutReducer from "./Cout/gitCoutSlice";

import gitVenteReducer from "./vente/gitVenteSlice";


>>>>>>> 4d4a617e59d2efb1b27a3a290e29b34114bb6ef3
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
<<<<<<< HEAD
 gitPlanning:gitPlanningReducer,
 gitPersonnel:gitPersonnelReducer,
 gitTypePersonnel: gitTypePersonnelReducer,
 gitchargefixe: gitChargeFixeReducer,
  gitJours:gitJourReducer,
  gitUser: gitUserReducer, // Assign gitUserReducer to the key 'gitUser'
=======
  gitUnite:gitUniteReducer,
  gitFournisseur:gitFournisseurReducer,
  gitIngredientCompose:gitIngredientComposeReducer,
  gitCarte:gitCarteReducer,
  gitPerte:gitPerteReducer,
  gitCout:gitCoutReducer,

  gitVente:gitVenteReducer,
  gitMarchandiseIngredient:gitMarchandiseIngredientReducer,
  gitMarchandisePackaging:gitMarchandisePackagingReducer,
  gitUser: gitUserReducer, 
  gitUserStatique: gitUserStatiqueReducer, 

>>>>>>> 4d4a617e59d2efb1b27a3a290e29b34114bb6ef3
  AdminTable,
  
});

export default rootReducer;
