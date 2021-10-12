const SOLICITUD_ADMIN_LOADING = '@admin/solicitud/page/loading'
const SOLICITUD_ADMIN_LOADING_SUCCESS = '@admin/solicitud/page/loading/success'

const SOLICITUD_ADMIN_CURRENT_SELECT = '@admin/solicitud/select/current'
const SOLICITUD_ADMIN_CURRENT_SELECT_SUCCESS =
  '@admin/solicitud/select/current/success'

const SOLICITUD_ADMIN_SEND = '@admin/solicitud/send'
const SOLICITUD_ADMIN_SEND_SUCCESS = '@admin/solicitud/send/success'

export const actionsType = {
  SOLICITUD_ADMIN_LOADING,
  SOLICITUD_ADMIN_LOADING_SUCCESS,

  // selection
  SOLICITUD_ADMIN_CURRENT_SELECT,
  SOLICITUD_ADMIN_CURRENT_SELECT_SUCCESS,

  SOLICITUD_ADMIN_SEND,
  SOLICITUD_ADMIN_SEND_SUCCESS
}

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 10
  },
  loading: false,
  current: {
    id: null,
    data: {},
    solicitud: {},
    loading: false
  }
}

// actions
export const pageLoading = (payload) => ({
  type: SOLICITUD_ADMIN_LOADING,
  payload
})

export const selectionCurrentById = (payload) => ({
  type: SOLICITUD_ADMIN_CURRENT_SELECT,
  payload
})

export const sendSolicitudServer = (payload) => ({
  type: SOLICITUD_ADMIN_SEND,
  payload
})

const reducers = (state = initialState, { type, payload }) => {
  if (type === SOLICITUD_ADMIN_LOADING) {
    return {
      ...state,
      loading: true
    }
  }

  if (type === SOLICITUD_ADMIN_LOADING_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: payload.data,
      page: {
        pageSize: 10,
        total: payload.total,
        current: payload.current
      }
    }
  }

  if (type === SOLICITUD_ADMIN_CURRENT_SELECT) {
    return {
      ...state,
      current: Object.assign({}, initialState.current, {
        loading: true
      })
    }
  }

  if (type === SOLICITUD_ADMIN_CURRENT_SELECT_SUCCESS) {
    return {
      ...state,
      current: {
        id: payload.id,
        loading: false,
        data: payload.data,
        solicitud: payload.solicitud
      }
    }
  }

  if (type === SOLICITUD_ADMIN_SEND_SUCCESS) {
    return {
      ...state,
      current: Object.assign({}, initialState.current),
      data: state.data.filter((item) => item.id !== payload.id)
    }
  }

  return state
}

export default reducers
