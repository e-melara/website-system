import { initThemeUi, changeThemeUI, changeOpenClose } from "../../utils/ui";

// types
const UI_EMPTY = "[UI] UI EMPTY";

export const UI_LOADING_SHOW = "[UI] SHOW LOADING";
export const UI_LOADING_HIDE = "[UI] HIDDEN LOADING";

export const UI_INIT = "[UI] INIT CHANGE";
export const UI_THEME_CHANGE = "[UI] CHANGE THEME";
export const UI_ICON_CLOSE_PAGE = "[UI] CHANGE PAGE CLOSE";

export const uiEmptyChange = () => ({ type: UI_EMPTY });

// reducers
const initialState = {
  loading: false,
  theme: "ligth",
  isClose: false,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case UI_EMPTY:
      return initialState;
    case UI_LOADING_SHOW:
      return { ...state, loading: true };
    case UI_LOADING_HIDE:
      return { ...state, loading: false };
    case UI_ICON_CLOSE_PAGE:
      return { ...state, isClose: payload };
    case UI_THEME_CHANGE:
      return { ...state, 
        theme: payload === 'ligth' ? 'dark' : 'ligth'
      };
    case UI_INIT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default reducers;

// actions
export const startLoading = () => ({
  type: UI_LOADING_SHOW,
});

export const finishLoading = () => ({
  type: UI_LOADING_HIDE,
});

export const initUI = () => {
  const ui = initThemeUi();
  return { type: UI_INIT, payload: { ...ui } };
};

export const changeTheme = () => {
  const theme = changeThemeUI();
  return { type: UI_THEME_CHANGE, payload: theme };
};

export const actionOnChangeTheme = (payload) => ({
  type: UI_THEME_CHANGE, payload
})

export const changeOpenCloseAction = () => {
  const open = changeOpenClose();
  return { type: UI_ICON_CLOSE_PAGE, payload: open };
};
