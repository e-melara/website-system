// types
export const UI_LOADING_SHOW = "[UI] SHOW LOADING";
export const UI_LOADING_HIDE = "[UI] HIDDEN LOADING";

// reducers
const initialState = {
  loading: false,
};

const reducers = (state = initialState, { type }) => {
  switch (type) {
    case UI_LOADING_SHOW:
      return { loading: true };
    case UI_LOADING_HIDE:
      return { loading: false };
    default:
      return state;
  }
};

export default reducers;

// actions
export const startLoading = () => ({
  type: UI_LOADING_SHOW
});

export const finishLoading = () => ({
  type: UI_LOADING_HIDE
})