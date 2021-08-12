import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";

import RootSaga from "../saga";
import RootReducer, { composeEnhancers } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);
