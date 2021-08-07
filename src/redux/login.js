import { KeyLocalStorage } from "../consts";

// actions
const LOGIN = "[AUTH] LOGIN";
const LOGIN_LOGOUT = "[AUTH] LOGOUT";
const LOGIN_CHECKING = "[AUTH] CHECKING";
const LOGIN_ASYNC = "[AUTH] LOGIN_ASYCN";
const LOGIN_ERROR = "[AUTH] LOGIN ERROR";
const LOGIN_CHECKING_ASYNC = "[AUTH] CHECKING ASYNC";

// actionsTypes
export const actionType = {
  LOGIN,
  LOGIN_ASYNC,
  LOGIN_ERROR,
  LOGIN_LOGOUT,
  LOGIN_CHECKING,
  LOGIN_CHECKING_ASYNC,
};

// actions
export const actionLogin = (username, password) => ({
  type: LOGIN,
  payload: { username, password },
});

export const actionLoginSuccess = ({ carrera, usuario }) => ({
  type: LOGIN_ASYNC,
  payload: { carrera, usuario },
});

export const startChecking = () => ({ type: LOGIN_CHECKING });
export const checkingFinish = () => ({ type: LOGIN_CHECKING_ASYNC });

export const logout = () => {
  localStorage.removeItem(KeyLocalStorage);
  localStorage.removeItem("ui");
  return {
    type: LOGIN_LOGOUT,
  };
};

// Reducer
const initialState = {
  data: null,
  carrera: null,
  checking: true,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ASYNC:
      return {
        checking: false,
        isAuthenticated: true,
        data: payload.usuario,
        carrera: payload.carrera,
      };

    case LOGIN_CHECKING_ASYNC:
      return { ...state, checking: false };
    case LOGIN_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
