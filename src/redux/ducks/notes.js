// const actions
export const NOTES_LOADING_ALL = "[NOTES] NOTES LOADING ALL";
export const NOTES_LOADING_ALL_ASYCN = "[NOTES] NOTES LOADING ALL ASYNC";

export const notesLoading = () => ({ type: NOTES_LOADING_ALL });

export const notesAllLoading = (payload) => ({
  type: NOTES_LOADING_ALL_ASYCN,
  payload,
});

export const actionTypes = { NOTES_LOADING_ALL, NOTES_LOADING_ALL_ASYCN };

const initialState = {};
const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTES_LOADING_ALL_ASYCN:
      return { ...state };
    default:
      return state;
  }
};

export default reducers;
