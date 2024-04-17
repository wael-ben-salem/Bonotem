import axios from 'axios';
import {
  
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  
} from "./actionTypes";

export const RegisterAuthAction = (userState, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/register", userState);
      console.log(response);
      

      if (response.status === 200) {
        // Successful registration
        dispatch({ type: REGISTER_USER_SUCCESSFUL, payload: response });


      } else {
        // Handle validation errors
        if (response.validation_errors) {
          dispatch({ type: REGISTER_USER_FAILED, payload: response });
          window.location.reload()

        } else {
          dispatch({ type: REGISTER_USER_FAILED, payload: response });
          window.location.reload()

        }
      }
    } catch (error) {
    }
  };
};

