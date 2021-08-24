// const actions
export const CHECKING = "[NOTES] CHECKING DATA";
export const NOTES_LOADING_ALL = "[NOTES] NOTES LOADING ALL";
export const NOTES_LOADING_ALL_ASYCN = "[NOTES] NOTES LOADING ALL ASYNC";

export const checking = (payload) => {
  if (payload) {
    return { type: CHECKING };
  }
  return {
    type: NOTES_LOADING_ALL,
  };
};
export const notesLoading = () => ({ type: NOTES_LOADING_ALL });

export const notesAllLoading = (payload) => ({
  type: NOTES_LOADING_ALL_ASYCN,
  payload,
});

export const actionTypes = {
  NOTES_LOADING_ALL,
  NOTES_LOADING_ALL_ASYCN,
  CHECKING,
};

const initialState = {
  notes: [],
  schules: [],
  active: false,
  loading: false,
};
const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECKING:
      return { ...state, loading: true };
    case NOTES_LOADING_ALL_ASYCN:
      return Object.assign({}, state, {
        loading: true,
        active: payload.active,
        notes: payload.history,
        schules: payload.schules,
      });
    default:
      return state;
  }
};

export default reducers;
