const ASESORIA_ADMIN_LOADING = "@admin/asesoria/page/loading";
const ASESORIA_ADMIN_LOADING_SUCCESS = "@admin/asesoria/page/loading/success";

const ASESORIA_ADMIN_CURRENT_SELECT = "@admin/asesoria/select/current";
const ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS =
  "@admin/asesoria/select/add/keys";
const ASESORIA_ADMIN_CURRENT_SELECT_EMPTY =
  "@admin/asesoria/select/current/empty";
const ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS =
  "@admin/asesoria/select/current/success";

const ASESORIA_ADMIN_ADD_TYPE = "@admin/asesoria/add/type";
const ASESORIA_ADMIN_ADD_TYPE_SUCCESS = "@admin/asesoria/add/type/success";

export const actionsType = {
  ASESORIA_ADMIN_LOADING,
  ASESORIA_ADMIN_LOADING_SUCCESS,

  // current
  ASESORIA_ADMIN_CURRENT_SELECT,
  ASESORIA_ADMIN_CURRENT_SELECT_EMPTY,
  ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS,
  ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS,

  // add
  ASESORIA_ADMIN_ADD_TYPE,
  ASESORIA_ADMIN_ADD_TYPE_SUCCESS,
};

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  loading: false,
  current: {
    id: null,
    estado: "",
    enrolled: [],
    isSend: false,
    loading: false,
    selectedRowsKeyArray: [],
  },
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

  // current enrolled current
  if (type === ASESORIA_ADMIN_CURRENT_SELECT) {
    return {
      ...state,
      current: {
        ...state.current,
        loading: true,
      },
    };
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS) {
    return {
      ...state,
      current: {
        id: payload.id,
        loading: false,
        estado: payload.estado,
        enrolled: payload.enrolled,
        isSend: payload.estado === "V",
        selectedRowsKeyArray: payload.selectedRowsKeyArray,
      },
    };
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_EMPTY) {
    return {
      ...state,
      current: {
        id: "",
        estado: "",
        enrolled: [],
        isSend: false,
        loading: false,
        selectedRowsKeyArray: [],
      },
    };
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedRowsKeyArray: payload,
      },
    };
  }
  // fin enrolled current

  if (type === ASESORIA_ADMIN_ADD_TYPE_SUCCESS) {
    return {
      ...state,
      current: {
        id: "",
        estado: "",
        enrolled: [],
        isSend: false,
        loading: false,
        selectedRowsKeyArray: [],
      },
      data: state.data.filter(({ id }) => id !== payload),
    };
  }

  return state;
};

export default reducers;
