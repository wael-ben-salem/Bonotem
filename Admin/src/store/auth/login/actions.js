import {
  
  LOGINADMIN_SUCCESS,
  LOGINUSER_SUCCESS,
  LOGINMANAGER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  CLEAR_REDUX_STATE,
} from "./actionTypes"
import axios from 'axios';



export const LoginAuthAction = (loginState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/login", loginState);

      const { statut, status, role } = response;

      if (status === 200) {
        if (role === "admin") {
          localStorage.setItem("authUser", JSON.stringify(response));

  
          dispatch({ type: LOGINADMIN_SUCCESS, payload: response });
          history("/admindashboard");
        } 
        else if ((statut === "activé") && (role === "restaurateur")) {
          localStorage.setItem("authUser", JSON.stringify(response));

          dispatch({ type: LOGINUSER_SUCCESS, payload: response });

          history("/dashboard");
        } else if ((statut === "activé") && (role === "manager")){
          localStorage.setItem("authUser", JSON.stringify(response));

          dispatch({ type: LOGINMANAGER_SUCCESS, payload: response });
          history("/test");
        }else{
          dispatch({ type: LOGINUSER_SUCCESS, payload: response });
          history("/pages-404");

        }

      } else {
        const errorMessage = "An error occurred";
        dispatch({ type: API_ERROR, payload: errorMessage });
        setErrorHandler({ hasError: true, message: errorMessage });
        window.location.reload();
      }
      
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({ type: API_ERROR, payload: errorMessage });
      setErrorHandler({ hasError: true, message: errorMessage });
    }
  };
};



export const loginSuccess = user => {
  return {
    type: LOGINUSER_SUCCESS,
    payload: user,
  }
}
export const loginManagerSuccess = user => {
  return {
    type: LOGINMANAGER_SUCCESS,
    payload: user,
  }
}
export const clearReduxState = () => ({
  type: CLEAR_REDUX_STATE,
});

export const logoutUser = history => {
  // Clear authentication data from local storage
  localStorage.removeItem("authUser");
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}


export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
