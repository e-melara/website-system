const ASESORIA_ADMIN_LOADING = '@admin/asesoria/page/loading'
const ASESORIA_ADMIN_LOADING_SUCCESS = '@admin/asesoria/page/loading/success'

const ASESORIA_ADMIN_CURRENT_SELECT = '@admin/asesoria/select/current'
const ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS = '@admin/asesoria/select/add/keys'
const ASESORIA_ADMIN_CURRENT_SELECT_EMPTY =
  '@admin/asesoria/select/current/empty'
const ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS =
  '@admin/asesoria/select/current/success'

const ASESORIA_ADMIN_ADD_TYPE = '@admin/asesoria/add/type'
const ASESORIA_ADMIN_ADD_TYPE_SUCCESS = '@admin/asesoria/add/type/success'

const ASESORIA_ADMIN_MATRICULAR = '@admin/asesoria/matricular'
const ASESORIA_ADMIN_MATRICULAR_SUCCESS = '@admin/asesoria/matricular/success'

const ASESORIA_CONFIGURACION = '@admin/asesoria/data'
const ASESORIA_CONFIGURACION_SUCCESS = '@admin/asesoria/data/success'

const ASESORIA_CONFIGURATION_SAVE = '@admin/asesoria/save/configuration'
const ASESORIA_CONFIGURATION_SAVE_SUCCESS =
  '@admin/asesoria/save/configuration/success'

export const actionsType = {
  ASESORIA_ADMIN_LOADING,
  ASESORIA_ADMIN_LOADING_SUCCESS,

  ASESORIA_CONFIGURACION,
  ASESORIA_CONFIGURACION_SUCCESS,

  ASESORIA_CONFIGURATION_SAVE,
  ASESORIA_CONFIGURATION_SAVE_SUCCESS,

  // current
  ASESORIA_ADMIN_CURRENT_SELECT,
  ASESORIA_ADMIN_CURRENT_SELECT_EMPTY,
  ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS,
  ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS,

  // add
  ASESORIA_ADMIN_ADD_TYPE,
  ASESORIA_ADMIN_ADD_TYPE_SUCCESS,

  // matricular alumno
  ASESORIA_ADMIN_MATRICULAR,
  ASESORIA_ADMIN_MATRICULAR_SUCCESS
}

// actions
export const enrolledAsesoria = (payload) => {
  return {
    type: ASESORIA_ADMIN_MATRICULAR,
    payload
  }
}

export const loadingDataAsesoria = (payload) => {
  return {
    type: ASESORIA_CONFIGURACION,
    payload
  }
}

export const saveConfiguration = (payload) => ({
  type: ASESORIA_CONFIGURATION_SAVE,
  payload
})

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 10
  },
  loading: false,
  configuration: {
    extra: '2000-01-20',
    valor: false,
    loading: false
  },
  current: {
    id: null,
    pago: {},
    estado: '',
    enrolled: [],
    isSend: false,
    loading: false,
    selectedRowsKeyArray: []
  }
}

const reducers = (state = initialState, { type, payload }) => {
  if (type === ASESORIA_ADMIN_LOADING) {
    return {
      ...state,
      loading: true
    }
  }

  if (type === ASESORIA_CONFIGURACION_SUCCESS) {
    return {
      ...state,
      configuration: payload
    }
  }

  if (type === ASESORIA_ADMIN_LOADING_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: payload.data,
      page: {
        total: payload.total,
        pageSize: payload.to,
        current: payload.current
      }
    }
  }

  // current enrolled current
  if (type === ASESORIA_ADMIN_CURRENT_SELECT) {
    return {
      ...state,
      current: {
        ...state.current,
        loading: true
      }
    }
  }

  if (type === ASESORIA_CONFIGURATION_SAVE_SUCCESS) {
    return {
      ...state,
      configuration: {
        ...state.configuration,
        valor: payload.valor,
        extra: payload.extra
      }
    }
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS) {
    return {
      ...state,
      current: {
        id: payload.id,
        loading: false,
        estado: payload.estado,
        pago: payload.pago || {},
        enrolled: payload.enrolled,
        selectedRowsKeyArray: payload.selectedRowsKeyArray,
        isSend: payload.estado === 'V' || payload.estado === 'F'
      }
    }
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_EMPTY) {
    return {
      ...state,
      current: {
        id: '',
        estado: '',
        enrolled: [],
        isSend: false,
        loading: false,
        selectedRowsKeyArray: []
      }
    }
  }

  if (type === ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedRowsKeyArray: payload
      }
    }
  }
  // fin enrolled current

  if (type === ASESORIA_ADMIN_ADD_TYPE_SUCCESS) {
    return {
      ...state,
      current: {
        id: '',
        estado: '',
        enrolled: [],
        isSend: false,
        loading: false,
        selectedRowsKeyArray: []
      },
      data: state.data.filter(({ id }) => id !== payload)
    }
  }

  if (ASESORIA_ADMIN_MATRICULAR_SUCCESS === type) {
    return {
      ...state,
      data: state.data.filter(({ id }) => id !== payload)
    }
  }

  return state
}

export default reducers
