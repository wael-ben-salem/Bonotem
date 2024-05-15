import axios from 'axios';
import {
  
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  
} from "./actionTypes";

export const RegisterAuthAction = (userState, navigate,setErrorHandler,setShowSuccessMessage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/register", userState);
      console.log(response);
      

      if (response.status === 200) {
        // Successful registration
        dispatch({ type: REGISTER_USER_SUCCESSFUL, payload: response });
        setErrorHandler({ hasError: false, message: "" }); // Reset error handler
        setShowSuccessMessage(true); // Set showSuccessMessage to true
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
        }, 3000);
      } else {
        // Handle validation errors
         
          const errorMessage = "An error occurred";
          dispatch({ type: REGISTER_USER_FAILED, payload: errorMessage });
          setErrorHandler({ hasError: true, message: errorMessage });
          
          window.location.reload()

        
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({ type: REGISTER_USER_FAILED, payload: errorMessage });
      setErrorHandler({ hasError: true, message: errorMessage });
    }
  };
};

