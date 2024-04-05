import {
  
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  
  SOCIAL_LOGIN,
} from "./actionTypes"
import axios from 'axios';



export const LoginAuthAction = (loginState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/login", loginState);
      dispatch({ type: LOGIN_SUCCESS, payload: response });

      const { status , role} = response;

      if ((status === 200) && (role === "admin") ) {
        localStorage.setItem("authUser", JSON.stringify(response));

        dispatch({ type: LOGIN_SUCCESS, payload: response });
        history("/");
      } 
      else if ((status === 200) && (role === "") ){
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        history("/register");
      }else{
        const errorMessage = "An error occurred";
        dispatch({ type: API_ERROR, payload: errorMessage });
        setErrorHandler({ hasError: true, message: errorMessage });
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
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
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
