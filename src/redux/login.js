import { axiosConfig } from "../config/axios";
import { showErrorToast } from "../utils/errors";
import { startLoading, finishLoading } from "./ui";
import { LOGIN_REDUX, KeyLocalStorage } from "../consts";

// types
export const LOGIN_SUCCESS = `${LOGIN_REDUX}-LOGIN_SUCCESS`;
export const LOGIN_CHECKING_FINISH = `${LOGIN_REDUX}-LOGIN_CHECKING_FINISH`;

// Reducer
const initialState = {
  data: null,
  checking: true,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        data: payload,
        checking: false,
        isAuthenticated: true,
      };

    case LOGIN_CHECKING_FINISH:
      return {
        ...state,
        checking: false,
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
      dispatch(login(data.usuario));
    })
    .catch((error) => {
      const { response } = error;
      if(response) {
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
        const { usuario } = response.data;
        dispatch(login(usuario));
      })
      .catch(() => {
        localStorage.removeItem(KeyLocalStorage);
        dispatch(checkingFinish());
      });
  };
};

export const checkingFinish = () => ({ type: LOGIN_CHECKING_FINISH });

export const login = (usuario) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...usuario,
  },
});
