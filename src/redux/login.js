import { axiosConfig } from "../config/axios";
import { showErrorToast } from "../utils/errors";
import { startLoading, finishLoading } from "./ui";
import { LOGIN_REDUX, KeyLocalStorage } from "../consts";

// types
export const LOGIN_ERROR = `${LOGIN_REDUX}-LOGIN_ERROR`;
export const LOGIN_SUCCESS = `${LOGIN_REDUX}-LOGIN_SUCCESS`;

// Reducer
const initialState = {
  data: null,
  isError: false,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isError: false,
        data: payload,
        isAuthenticated: true,
      };
    case LOGIN_ERROR:
      return {
        data: null,
        isError: true,
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
  axiosConfig.post('auth/login', { username, password })
    .then(({ data }) => {
      localStorage.setItem(KeyLocalStorage, data.token);
      dispatch(login(data.usuario))
    }).catch(error => {
      showErrorToast(error);
    }).finally(() => {
      dispatch(finishLoading())
    })
};

export const errorToast = (error) => ({
  type: LOGIN_ERROR,
})

export const login = (usuario) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...usuario,
  },
});
