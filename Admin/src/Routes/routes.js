import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";
//Admin-Dashboard
import AdminDashboard from "../Pages/AdminDashboard";
import AdminManagerList from "../Pages/AdminDashboard/AdminManajerListTable";

import Testexample from "../Pages/Test/test";


import IngredientCompose from "../Pages/Ingredient/IngredientComposeListTable";


// Import Planning
import Planning from "../Pages/Personnels et Planning";


// Import Catégorie
import Categorie from "../Pages/Categorie/CategoryListTable.js";
import MarchandiseIngredient from  "../Pages/Marchandise/MarchandiseIngredientListTable.js";
import MarchandisePackaging from  "../Pages/Marchandise/MarchandisePackagingListTable.js";

import Produit from "../Pages/Produit/ProduitListTable.js";
import Packagings from "../Pages/Packagings";
import PackagingsCategorie from "../Pages/PackagingsCategorie";

// Import E-mail
import Inbox from "../Pages/E-mail/Inbox";
import ReadEmail from "../Pages/E-mail/ReadEmail";
import EmailCompose from "../Pages/E-mail/EmailCompose";
import Ingredient from "../Pages/Ingredient/IngredientListTable.js";
// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";

// Import Authentication Inner Pages
import Login1 from "../Pages/AuthenticationPages/Login";
import Register1 from "../Pages/AuthenticationPages/Register";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
import LockScreen from "../Pages/AuthenticationPages/LockScreen";

// Import Utility Pages
import StarterPage from "../Pages/Utility/Starter-Page";
import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import TimeLine from "../Pages/Utility/TimeLine-Page";
import FAQs from "../Pages/Utility/FAQs-Page";
import Pricing from "../Pages/Utility/Pricing-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";


// Import Forms
import FormEditors from "../Pages/Forms/FormEditors";
import FormUpload from "../Pages/Forms/FormUpload";
import FormXeditable from "../Pages/Forms/FormXeditable";
import FormMask from "../Pages/Forms/FormMask";
import FormElements from "../Pages/Forms/FormElements";
import FormAdvanced from "../Pages/Forms/FormAdvanced";
import FormValidations from "../Pages/Forms/FormValidations";
import FormWizard from "../Pages/Forms/FormWizard";

// Import Tables
import BasicTable from "../Pages/Tables/BasicTable.js";
import ListJs from "../Pages/Tables/ListTables/ListTables";
import AdminList from "../Pages/AdminDashboard/AdminUserListTables";
import DataTable from "../Pages/Tables/DataTables/DataTables";





// Import Icon Pages
import IconMaterialdesign from "../Pages/Icons/IconMaterialdesign";
import IconFontawesome from "../Pages/Icons/IconFontAwesome";
import IconDripicons from "../Pages/Icons/IconDrip";
import IconBoxicons from "../Pages/Icons/IconBoxicons";
import Chart from "../Pages/AllCharts/apex/RadialChart";







// Import Map Pages
import VectorMaps from "../Pages/Maps/VectorMap";
import GoogleMap from "../Pages/Maps/GoogleMap";
import FournisseurListTable from "../Pages/Fournisseur/FournisseurListTable";
import CartesListTable from "../Pages/Carte/CarteListTable";
import VentesListTable from "../Pages/Vente/VentesListTable";
import PerteListTable from "../Pages/Perte/PerteListTable";
import CoutListTable from "../Pages/Cout/CoutListTable.js";


const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },


  //marchandise
  { path: "/marchandise-Ingredient", component: <MarchandiseIngredient /> },
  { path: "/marchandise-Packaging", component: <MarchandisePackaging /> },


  //ingredientCompose
  { path: "/ingredientCompose", component: <IngredientCompose /> },

  { path: "/chart-apexcharts", component: <Chart /> },
  


  //Fournisseur
  { path: "/Fournisseur", component: <FournisseurListTable /> },


  //carte

  { path: "/carte", component: <CartesListTable /> },

  //pertes

  { path: "/perte", component: <PerteListTable /> },
  
  { path: "/couts", component: <CoutListTable /> },

  //ventes
  { path: "/vente", component: <VentesListTable /> },


  


  




// Packagings_categorie
{ path: "/PackagingsCategorie", component: <PackagingsCategorie /> },


// Packagings
{ path: "/Packagings", component: <Packagings /> },


  // Calender
  { path: "/planning", component: <Planning /> },

  
   // Catégorie
    { path: "/categorie", component: <Categorie /> },
     // Produit
     { path: "/produit", component: <Produit /> },
     // Profile
  { path: "/userprofile", component: <UserProfile /> },
 { path: "/ingredient", component: <Ingredient /> },
  // E-mail
  { path: "/inbox", component: <Inbox /> },
  { path: "/read-email", component: <ReadEmail /> },
  { path: "/compose-email", component: <EmailCompose /> },

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  { path: "/pages-timeline", component: <TimeLine /> },
  { path: "/pages-faqs", component: <FAQs /> },
  { path: "/pages-pricing", component: <Pricing /> },



  // Forms pages
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editor", component: <FormEditors /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-editors", component: <FormXeditable /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-mask", component: <FormMask /> },

  // Tables pages
  { path: "/tables-basic", component: <BasicTable /> },
  { path: "/tables-listjs", component: <ListJs /> },
  { path: "/table-datatables", component: <DataTable /> },



  // Icons Pages
  { path: "/icon-boxicon", component: <IconBoxicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icon-dripicons", component: <IconDripicons /> },

  // Maps Pages
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-google", component: <GoogleMap /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login"/>,
  },
];

const authAdminProtectedRoutes = [
  //Admin-dashboard
  { path: "/admindashboard", component: <AdminDashboard /> },
  { path: "/adminlistjs-tables", component: <AdminManagerList /> },
  { path: "/tables-adminlistjs", component: <AdminList /> },

   // Profile
   { path: "/userprofile", component: <UserProfile /> },


  
];


const authManagerProtectedRoutes = [
  { path: "/test", component: <Testexample /> },
   // Profile
   { path: "/userprofile", component: <UserProfile /> },
   


  //Admin-dashboard
  
  
];













const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner Pages
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes ,authManagerProtectedRoutes,authAdminProtectedRoutes };
