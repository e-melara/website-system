import { isEqual } from 'lodash'

// types

// loading all
const PENSUM_LOADING_ALL = '[ASESORIA] ALL DATA RESPONSE ASESORIA'
const PENSUM_LOADING_ALL_SUCCESS =
  '[ASESORIA] ALL DATA RESPONSE ASESORIA SUCCESS'

const ASESORIA = '[ASESORIA] ASESORIA'
const ASESORIA_EMPTY = '[ASESORIA] EMPTY'
const ASESORIA_ASYNC = '[ASESORIA] ASESORIA_ASYNC'
const ASESORIA_SUBJECT_SCHULES = '[ASESORIA] SUBJECT SCHULES'

// SEND ASESORIA REQUEST
const ASESORIA_REQUEST_SEND = '[ASESORIA] REQUEST SEND ASESORIA'
const ASESORIA_RESPONSE_SEND = '[ASESORIA] RESPONSE SEND ASESORIA'

// Types actions asesoria Enrolled
const ASESORIA_SUBJECT_ENROLLED_DELETED = '[ASESORIA ENROLLED] DELETE SCHULES'

// Verificando si hay datos en el store
const CHECKING_DATA = '[ASESORIA CHECKING] VERIFICATED DATA'

// Para las acciones de las solicitudes
const SOLICITUD_ADD_POST = '[ASESORIA] ADD POST'
const SOLICITUD_ADD_SUCCESS_EXTRA = '[ASESORIA] ADD POST SUCCESS EXTRA'
const SOLICITUD_ADD_SUCCESS_OTHERS = '[ASESORIA] ADD POST SUCCESS OTHERS'

// const para los pagos
const SOLICITUD_ARANCELES = '[ASESORIA] SOLICITUD ASESORIA ARANCELES'
const SOLICITUD_ARANCELES_SUCCESS =
  '[ASESORIA] SOLICITUD ASESORIA ARANCELES SUCCESS'

const SOLICITUD_ARANCELE_ADD_ITEM = '[ASESORIA] ADD ITEM ARANCEL'
const SOLICITUD_ARANCELE_REMOVE_ITEM = '[ASESORIA] REMOVE ITEM ARANCEL'

const SOLICITUD_ARANCELES_POST_SAVE = '[ASESORIA] SOLICITUD ARANCELES POST'
const SOLICITUD_ARANCELES_POST_SAVE_SUCCESS =
  '[ASESORIA] SOLICITUD ARANCELES POST SUCCESS'

export const actionsTypes = {
  ASESORIA,
  ASESORIA_EMPTY,
  CHECKING_DATA,
  ASESORIA_ASYNC,
  PENSUM_LOADING_ALL,
  ASESORIA_REQUEST_SEND,
  ASESORIA_SUBJECT_SCHULES,
  PENSUM_LOADING_ALL_SUCCESS,
  ASESORIA_SUBJECT_ENROLLED_DELETED,
  // SOLICITUD
  SOLICITUD_ADD_POST,
  // ARANCELES
  SOLICITUD_ARANCELES,
  SOLICITUD_ARANCELES_SUCCESS,
  SOLICITUD_ARANCELES_POST_SAVE,
  SOLICITUD_ARANCELES_POST_SAVE_SUCCESS
}

//actions para las solicitudes
export const addSolicitud = (payload) => ({
  type: SOLICITUD_ADD_POST,
  payload
})

export const resolveSolicitudExtra = (payload) => ({
  type: SOLICITUD_ADD_SUCCESS_EXTRA,
  payload
})

export const resolveSolicitudOther = (payload) => ({
  type: SOLICITUD_ADD_SUCCESS_OTHERS,
  payload
})

// actions
export const checking = (payload) => {
  if (payload) {
    return { type: CHECKING_DATA }
  }
  return {
    type: PENSUM_LOADING_ALL
  }
}
export const pensumLoadingAll = () => ({ type: PENSUM_LOADING_ALL })
export const startLoadingAsesoria = () => ({ type: ASESORIA })
export const loaderSubjects = (materias) => ({
  type: ASESORIA_ASYNC,
  payload: materias
})

export const selectionSubjectSchules = (object) => ({
  type: ASESORIA_SUBJECT_SCHULES,
  payload: { ...object }
})

export const deleteSchulesSubject = (payload) => ({
  type: ASESORIA_SUBJECT_ENROLLED_DELETED,
  payload
})

export const asesoriaRequestSend = ({ phone, schules, pensum }) => {
  const codCargas = schules.map(function (e) {
    return e.schules.codcarga
  })
  return {
    type: ASESORIA_REQUEST_SEND,
    payload: { codCargas, phone }
  }
}

export const asesoriaReponseSend = (payload) => ({
  type: ASESORIA_RESPONSE_SEND,
  payload
})

export const pensumAddAllSuccess = (payload) => ({
  type: PENSUM_LOADING_ALL_SUCCESS,
  payload
})

// aranceles
export const removeArancelItem = (id) => ({
  type: SOLICITUD_ARANCELE_REMOVE_ITEM,
  payload: id
})
export const addArancelItem = (payload) => ({
  type: SOLICITUD_ARANCELE_ADD_ITEM,
  payload
})
export const loadingAranceles = () => ({ type: SOLICITUD_ARANCELES })
export const pagoSave = (formData) => ({
  type: SOLICITUD_ARANCELES_POST_SAVE,
  payload: formData
})

// initial state asesoria
export const initialStateAsesoria = () => ({ type: ASESORIA_EMPTY })

// reducers
const initialState = {
  bancos: [],
  pensum: [],
  subjects: [],
  enrolled: {},
  approved: [],
  active: false,
  aranceles: [],
  redirect: false,
  loading: false,
  schulesStudents: []
}

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    // aranceles
    case SOLICITUD_ARANCELES_POST_SAVE:
      return {
        ...state,
        redirect: false
      }
    case SOLICITUD_ARANCELES_POST_SAVE_SUCCESS:
      return {
        ...state,
        redirect: true,
        enrolled: {
          ...state.enrolled,
          estado: 'Facturar'
        }
      }
    case SOLICITUD_ARANCELES:
      return {
        ...state,
        aranceles: []
      }
    case SOLICITUD_ARANCELES_SUCCESS:
      return {
        ...state,
        redict: false,
        bancos: payload.bancos,
        aranceles: payload.arregloData
      }
    case SOLICITUD_ARANCELE_REMOVE_ITEM:
      return {
        ...state,
        aranceles: state.aranceles.filter(({ id }) => id !== payload)
      }
    case SOLICITUD_ARANCELE_ADD_ITEM:
      return {
        ...state,
        aranceles: [...state.aranceles, payload]
      }
    // checking data
    case CHECKING_DATA:
      return { ...state, loading: true }
    case PENSUM_LOADING_ALL_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: true
      }
    case ASESORIA_EMPTY:
      return initialState
    case ASESORIA_ASYNC:
      return { ...state, subjects: payload, active: false }
    case ASESORIA_SUBJECT_ENROLLED_DELETED:
      return {
        ...state,
        schulesStudents: state.schulesStudents.filter(
          (e) => e.subject.materia !== payload.materia
        ),
        subjects: state.subjects.map(function (item) {
          if (isEqual(item.materia, payload.materia)) {
            item.visible = true
          }
          return item
        })
      }
    case ASESORIA_SUBJECT_SCHULES:
      return {
        ...state,
        schulesStudents: state.schulesStudents.concat(payload),
        subjects: state.subjects.map(function (item) {
          if (isEqual(item.materia, payload.subject.materia)) {
            item.visible = false
          }
          return item
        })
      }
    case ASESORIA_RESPONSE_SEND:
      return {
        ...state,
        active: true,
        loading: true,
        enrolled: { ...payload.enrolled },
        pensum: { ...payload.pensum }
      }

    default:
      return state
  }
}

export default reducers
