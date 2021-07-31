import { axiosConfig } from "../config/axios";
import { showErrorToast } from "../utils/errors";
import { startLoading, finishLoading } from "./ui";
import { LOGIN_REDUX, KeyLocalStorage } from "../consts";

import { initUI } from "./ui";

// types
export const LOGOUT = `[${LOGIN_REDUX}]-LOGOUT`;
export const LOGIN_SUCCESS = `${LOGIN_REDUX}-LOGIN_SUCCESS`;
export const LOGIN_CHECKING_FINISH = `${LOGIN_REDUX}-LOGIN_CHECKING_FINISH`;

// Reducer
const initialState = {
  data: null,
  carrera: null,
  checking: true,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        checking: false,
        data: payload.data,
        isAuthenticated: true,
        carrera: payload.carrera,
      };

    case LOGIN_CHECKING_FINISH:
      return {
        ...state,
        checking: false,
      };
    case LOGOUT:
      return {
        data:null,
        carrera: null,
        checking: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;

// Actions
export const startLogin = (username, password) => async (dispatch) => {
  dispatch(startLoading());
  axiosConfig
    .post("auth/login", { username, password })
    .then((response) => {
      const { data } = response;
      localStorage.setItem(KeyLocalStorage, data.token);
      dispatch(login(data.usuario, data.carrera));
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        showErrorToast(response);
      }
    })
    .finally(() => {
      dispatch(finishLoading());
    });
};

export const startChecking = () => {
  return (dispatch) => {
    axiosConfig
      .post("auth/me")
      .then((response) => {
        const { usuario, carrera } = response.data;
        dispatch(login(usuario, carrera));
        dispatch(initUI());
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 401) {
          localStorage.removeItem(KeyLocalStorage);
        }
        dispatch(checkingFinish());
      });
  };
};

export const checkingFinish = () => ({ type: LOGIN_CHECKING_FINISH });

export const login = (usuario, carrera) => ({
  type: LOGIN_SUCCESS,
  payload: {
    data: { ...usuario },
    carrera: {...carrera},
  },
});

export const logout = () => {
  localStorage.removeItem(KeyLocalStorage);
  localStorage.removeItem('ui')
  return {
    type: LOGOUT,
  };
};
