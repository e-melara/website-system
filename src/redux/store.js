import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose  } from "redux";

// reducers
import UiReducers from "./ui";
import LoginReducers from "./login";
import AsesoriaReducers from "./asesoria";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  ui: UiReducers,
  auth: LoginReducers, 
  asesoria: AsesoriaReducers,
})

export const store = createStore(
  reducers, 
  composeEnhancers(
    applyMiddleware(thunk)
  )
)