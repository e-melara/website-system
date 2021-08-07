import { combineReducers, compose } from "redux";

import reducerUi from "./ui";
import reducerLogin from "./login";
import reducerAsesoria from "./asesoria";

const reducers = combineReducers({
  ui: reducerUi,
  auth: reducerLogin,
  asesoria: reducerAsesoria,
});

export const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default reducers;
