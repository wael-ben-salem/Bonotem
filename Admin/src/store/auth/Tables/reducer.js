import {
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
   
  } from "./actionTypes";
  
  const initialState = {
    AdminTable: {
      users: [], // Initial empty array
    },
  };
  
  const AdminTable = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {
              ...state,
              AdminTable: {
                ...state.AdminTable,
                users: action.payload,
              },
            };          

          
  
        case GET_USERS_FAIL:
            return {
              ...state,
              error: action.payload,
            };
  
      case ADD_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
  
      case ADD_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map(user =>
            user.id.toString() === action.payload.id.toString()
              ? { ...user, ...action.payload }
              : user
          ),
          isUserUpdated: true
        };
  
      case UPDATE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
          isUserUpdated: false
        };
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(
            user => user.id.toString() !== action.payload.id.toString()
          ),
        };
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
     
      default:
        return state;
    }
  };
  
  export default AdminTable;
  