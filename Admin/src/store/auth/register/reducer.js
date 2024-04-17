import {
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes";

const initialState = {
  user: null,
  registrationError:null,
  error: null
};

// Reducer function
const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        user: action.payload, // Assuming payload contains user data
        error: null // Reset error to null on successful registration
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        error: action.payload ,// Set error message from payload
        registrationError:true
      };
    default:
      return state;
  }
};


export default account;
