// types
export const UI_LOADING_SHOW = "[UI] SHOW LOADING";
export const UI_LOADING_HIDE = "[UI] HIDDEN LOADING";

// reducers
const initialState = {
  loading: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case UI_LOADING_SHOW:
      return { loading: true };
    case UI_LOADING_HIDE:
      return { loading: false };
    default:
      return state;
  }
};

// actions
export const startLoading = () => ({
  type: UI_LOADING_SHOW
});

export const finishLoading = () => ({
  type: UI_LOADING_HIDE
})