const UI = "[UI] INITIAL STATE";
const UI_LOADING = "[UI] LOADING CHANGE STATUS";
const UI_CHANGE_THEME = "[UI] CHANGE UI THEME STATUS";
const UI_CHANGE_SIDEBAR = "[UI] CHANGE UI SIDEBAR STATUS";

export const actionsType = {
  UI,
  UI_LOADING,
  UI_CHANGE_THEME,
  UI_CHANGE_SIDEBAR,
};

export const changeUiTheme = () => ({ type: UI_CHANGE_THEME });
export const changeUiSidebar = () => ({ type: UI_CHANGE_SIDEBAR });
export const initialStatus = (payload) => ({ type: UI, payload });
export const changeLoading = (payload) => ({ type: UI_LOADING, payload });

const initialState = {
  open: false,
  theme: "dark",
  loading: false,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case UI:
      return {
        ...payload,
        loading: false,
      };
    case UI_CHANGE_SIDEBAR:
      localStorage.setItem("open", !state.open);
      return {
        ...state,
        open: !state.open,
      };
    case UI_CHANGE_THEME:
      const theme = state.theme === "ligth" ? "dark" : "ligth";
      localStorage.setItem("theme", theme);
      return {
        ...state,
        theme: theme,
      };

    case UI_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default reducers;
