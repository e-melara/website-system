const LOADING_EVENTOS = "[EVENTOS] LOADING ALL EVENTOS";
const LOADING_EVENTOS_SUCCESS = "[EVENTOS] LOADING ALL EVENTOS SUCCESS";

const CHANGE_DATE = "[EVENTOS] CHANGE DATE";

export const actionsType = {
  LOADING_EVENTOS,
  LOADING_EVENTOS_SUCCESS,
  CHANGE_DATE,
};

export const loadingEventos = (payload) => ({ type: LOADING_EVENTOS, payload });
export const eventosSuccess = (payload) => ({
  type: LOADING_EVENTOS_SUCCESS,
  payload,
});

const initialState = {
  data: [],
  loading: false,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_EVENTOS:
      return {
        data: [],
        loading: true,
      };
    case LOADING_EVENTOS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducers;