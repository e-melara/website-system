const SOLICITUD_ADD_POST = "[SOLICITUD] ADD POST";
const SOLICITUD_ADD_SUCCESS = "[SOLICITUD] ADD POST SUCCESS";

export const actionsType = {
  SOLICITUD_ADD_POST,
  SOLICITUD_ADD_SUCCESS,
};

export const addSolictud = (payload) => ({ type: SOLICITUD_ADD_POST, payload });

const initialState = {};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SOLICITUD_ADD_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducers;
