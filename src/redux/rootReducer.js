import { combineReducers, compose } from "redux";

import reducerUi from "./ducks/ui";
import reducerLogin from "./ducks/login";
import reducerAsesoria from "./ducks/asesoria";

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
