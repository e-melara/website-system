import { RESET_STORE } from "../../consts";

// actions
const LOGIN = "[AUTH] LOGIN";
const LOGIN_LOGOUT = "[AUTH] LOGOUT";
const LOGIN_CHECKING = "[AUTH] CHECKING";
const LOGIN_ASYNC = "[AUTH] LOGIN_ASYCN";
const LOGIN_ERROR = "[AUTH] LOGIN ERROR";
const LOGIN_CHECKING_ASYNC = "[AUTH] CHECKING ASYNC";
const LOGIN_LOGOUT_ASYNC = "[AUTH] LOGIN_LOGOUT_ASYNC";

// actionsTypes
export const actionType = {
  LOGIN,
  LOGIN_ASYNC,
  LOGIN_ERROR,
  LOGIN_LOGOUT,
  LOGIN_CHECKING,
  LOGIN_LOGOUT_ASYNC,
  LOGIN_CHECKING_ASYNC,
};

// actions
export const actionLogin = (username, password) => ({
  type: LOGIN,
  payload: { username, password },
});

export const actionLoginSuccess = (payload) => ({
  type: LOGIN_ASYNC,
  payload: payload,
});

export const startChecking = () => ({ type: LOGIN_CHECKING });
export const checkingFinish = (payload) => ({ type: LOGIN_CHECKING_ASYNC, payload });

export const logout = () => ({ type: LOGIN_LOGOUT });

// Reducer
const initialState = {
  data: null,
  rol: null,
  routes: [],
  perfil: null,
  carrera: null,
  checking: true,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ASYNC:
      return {
        checking: false,
        rol: payload.rol,
        isAuthenticated: true,
        data: payload.usuario,
        perfil: payload.perfil,
        routes: payload.routes,
        carrera: payload.carrera,
      };

    case LOGIN_CHECKING_ASYNC:
      return { ...state, checking: false };
    case RESET_STORE:
      return Object.assign({}, initialState, {
        checking: false,
      });
    default:
      return state;
  }
};

export default reducer;
