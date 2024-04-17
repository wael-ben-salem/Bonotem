import {
  
  LOGINUSER_SUCCESS,
  LOGINADMIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const authState = {
  error:null,
  loading: false,
  user: {
  
    status: null,
    username: "",
    token: "",
    message: "",
    role: ""

  },
};

const login = (state = authState, action) => {
  switch (action.type) {
    case LOGINUSER_SUCCESS:
     
    return  {
      loading: true,
      user: action.payload,
     
    };
    case LOGINADMIN_SUCCESS:
     
    return  {
      loading: true,
      user: action.payload,
     
    };
    
      
      
    case LOGOUT_USER:

    return  {
      ...state,
            isUserLogout: false      
    };
        
     
    case LOGOUT_USER_SUCCESS:
      return  {
        ...state,
              isUserLogout: true      
      };
    case API_ERROR:
      return  {
        ...state,
        error: action.payload,
        loading: false,
        isUserLogout: false, 
      };
     
    default:
      return state;
  }
 
};

export default login;



