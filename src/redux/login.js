import { LOGIN_REDUX } from "../consts";
import { startLoading, finishLoading } from "./ui";

// types
export const LOGIN_SUCCESS = `${LOGIN_REDUX}-LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${LOGIN_REDUX}-LOGIN_ERROR`;

// Reducer
const initialState = {
  data: null,
  isError: false,
  isAuthenticated: false,
};

export default (state = initialState, { type, payload }) => {
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

// Actions
export const startLogin = (usuario, pasword) => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(login("ASJSB", "Edwin", "Melara"));
    dispatch(finishLoading());
  };
};

export const login = (token, name, last) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
    name,
    last,
  },
});
