import { combineReducers, compose } from "redux";

import reducerUi from "./ducks/ui";
import reducerNotes from "./ducks/notes";
import reducerLogin from "./ducks/login";
import reducerEventos from "./ducks/eventos";
import reducerAsesoria from "./ducks/asesoria";
import reducerSolicitud from "./ducks/solicitud";

import { RESET_STORE } from "../consts";

const appReducer = combineReducers({
  ui: reducerUi,
  auth: reducerLogin,
  notes: reducerNotes,
  eventos: reducerEventos,
  asesoria: reducerAsesoria,
  solicitud: reducerSolicitud,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default rootReducer;
