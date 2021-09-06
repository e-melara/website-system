const ASESORIA_ADMIN_LOADING = "@admin/asesoria/page/loading";
const ASESORIA_ADMIN_LOADING_SUCCESS = "@admin/asesoria/page/loading/success";

export const actionsType = {
  ASESORIA_ADMIN_LOADING,
  ASESORIA_ADMIN_LOADING_SUCCESS,
};

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 10
  },
  loading: false,
};

const reducers = (state = initialState, { type, payload }) => {
  if (type === ASESORIA_ADMIN_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === ASESORIA_ADMIN_LOADING_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: payload.data,
      page: {
        pageSize: 10,
        total: payload.total,
        current: payload.current,
      },
    };
  }

  return state;
};

export default reducers;
