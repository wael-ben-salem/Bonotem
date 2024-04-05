import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";

// Action Types
import {
  GET_USERS,
  ADD_NEW_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./actionTypes";

// Actions
import {
  getUsersSuccess,
  getUsersFail,
  addUserSuccess,
  addUserFail,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,

} from "./actions";

// Saga Worker Functions
function* fetchUsers() {
    try {
      const response = yield call(axios.get, "/user");
      yield put(getUsersSuccess(response.data));
    } catch (error) {
      console.error("Error fetching users:", error); // Log error
      yield put(getUsersFail(error));
    }
  }

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(axios.post, "/user", user);
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(axios.put, `/user/${user.id}`, user);
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* onDeleteUser({ payload: userId }) {
  try {
    const response = yield call(axios.delete, `/user/${userId}`);
    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}



// Saga Watcher Function
function* userSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
}

export default userSaga;
