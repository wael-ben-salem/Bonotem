import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {thunk} from "redux-thunk"; // Import thunk directly
import { clearReduxState } from "./auth/login/actions";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
  // Load authentication data from localStorage
  

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  store.dispatch(clearReduxState());

  sagaMiddleware.run(rootSaga);
  return store;
}
