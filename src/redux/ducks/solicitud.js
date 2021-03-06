const SOLICITUD_LOADER = '[SOLICITUD] LOADER PAGE'
const SOLICITUD_LOADER_DATA = '[SOLICITUD] LOADER PAGE SUCCESS'

const SOLICITUD_ADD_POST = '[SOLICITUD] ADD POST'
const SOLICITUD_ADD_SUCCESS = '[SOLICITUD] ADD POST SUCCESS'

const SOLICITUD_RESET = '[SOLICITUD] INITIAL STATE'
const SOLICITUD_SAVE = '[SOLICITUD] SAVE INFORMATION'
const SOLICITUD_ADD_OBJECT = '[SOLICITUD ADD] ADD OBJECT STATE'
const SOLICITUD_SIXTH_SUBJECT = '[SOLICITUD SIXTH] ADD SIXTH SUBJECT'
const SOLICITUD_SIXTH_SUBJECT_SUCCESS =
  '[SOLICITUD SIXTH] ADD SIXTH SUBJECT SUCESSS'

const SOLICITUD_SIXTH_SUBJECT_ERROR =
  '[SOLICITUD SIXTH] ADD SIXTH SUBJECT ERROR'

const SOLICITUD_INITIAL = '[SOLICITUD] INITIAL STATE'
const SOLICITUD_INITIAL_SUCCESS = '[SOLICITUD] INITIAL STATE SUCCESS'

export const actionsType = {
  SOLICITUD_SAVE,
  SOLICITUD_RESET,
  SOLICITUD_LOADER,
  SOLICITUD_INITIAL,
  SOLICITUD_ADD_POST,
  SOLICITUD_ADD_OBJECT,
  SOLICITUD_ADD_SUCCESS,
  SOLICITUD_LOADER_DATA,
  SOLICITUD_SIXTH_SUBJECT,
  SOLICITUD_INITIAL_SUCCESS,
  SOLICITUD_SIXTH_SUBJECT_ERROR,
  SOLICITUD_SIXTH_SUBJECT_SUCCESS,
}

export const paginator = (payload) => ({
  type: SOLICITUD_LOADER,
  payload
})

export const addObjectState = (payload) => ({
  type: SOLICITUD_ADD_OBJECT,
  payload
})

export const reset = () => ({ type: SOLICITUD_RESET })
export const initialStateSolicitud = () => ({ type: SOLICITUD_INITIAL })
export const saveSolicitud = (payload) => ({ type: SOLICITUD_SAVE, payload })
export const addSolictud = (payload) => ({ type: SOLICITUD_ADD_POST, payload })
export const addSixthSubject = (payload) => ({
  type: SOLICITUD_SIXTH_SUBJECT,
  payload
})

const initialState = {
  add: {
    type: '',
    data: false,
    subject: '',
    object: null,
    save: false,
    error: false,
    resolve: true,
    observacion: '',
    sixthSubject: null
  },
  list: {
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0
    },
    loading: true
  },
  estadistica: [],
  materias: []
}

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SOLICITUD_INITIAL_SUCCESS:
      return {
        ...state,
        materias: payload.materias,
        estadistica: payload.stadistic
      }
    case SOLICITUD_RESET:
      return initialState
    case SOLICITUD_ADD_SUCCESS:
      return { ...state, ...payload }
    case SOLICITUD_ADD_OBJECT:
      return {
        ...state,
        add: Object.assign({}, state.add, payload, {
          data: true
        })
      }

    case SOLICITUD_LOADER_DATA:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload.data,
          pagination: {
            pageSize: 5,
            current: payload.current_page,
            total: payload.total
          },
          loading: false
        }
      }

    case SOLICITUD_SIXTH_SUBJECT_SUCCESS:
      return initialState

    case SOLICITUD_SIXTH_SUBJECT_ERROR:
      return {
        ...state,
        add: {
          ...state.add,
          save: true,
          error: true
        }
      }

    case SOLICITUD_SIXTH_SUBJECT:
      return {
        ...state,
        add: {
          ...state.add,
          sixthSubject: payload
        }
      }
    default:
      return state
  }
}

export default reducers
