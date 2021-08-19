export const ADMIN_ASESORIA = "[ADMIN - ASESORIA] LOADING";

export const actionsTypes = {
  ADMIN_ASESORIA,
};

const initialState = {
  all: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_ASESORIA:
      return { ...state };
    default:
      return state;
  }
};
