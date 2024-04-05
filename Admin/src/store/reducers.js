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
import gitUserReducer from "../features/gitUserSlice"; // Import your gitUserReducer from its file
import AdminTable from "./auth/Tables/reducer";
const rootReducer = combineReducers({
  // public
  Layout,
  calendar,
  forgetPassword,
  login,
  profile,
  account,
  gitUser: gitUserReducer, // Assign gitUserReducer to the key 'gitUser'
  AdminTable
  
});

export default rootReducer;
