import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    ADD_NEW_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    
  } from "./actionTypes";
  
  export const getUsers = () => ({
    type: GET_USERS,
  });
  

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

  
  export const getUsersFail = error => ({
    type: GET_USERS_FAIL,
    payload: error,
  });
  
  export const addNewUser = user => ({
    type: ADD_NEW_USER,
    payload: user,
  });
  
  export const addUserSuccess = user => ({
    type: ADD_USER_SUCCESS,
    payload: user,
  });
  
  export const addUserFail = error => ({
    type: ADD_USER_FAIL,
    payload: error,
  });
  
  export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user,
  });
  
  export const updateUserSuccess = user => ({
    type: UPDATE_USER_SUCCESS,
    payload: user,
  });
  
  export const updateUserFail = error => ({
    type: UPDATE_USER_FAIL,
    payload: error,
  });
  
  export const deleteUser = userId => ({
    type: DELETE_USER,
    payload: userId,
  });
  
  export const deleteUserSuccess = userId => ({
    type: DELETE_USER_SUCCESS,
    payload: userId,
  });
  
  export const deleteUserFail = error => ({
    type: DELETE_USER_FAIL,
    payload: error,
  });
  
  
  