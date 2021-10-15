import { combineReducers, compose } from 'redux'

import reducerUi from './ducks/ui'
import reducerNotes from './ducks/notes'
import reducerLogin from './ducks/login'
import reducerEventos from './ducks/eventos'
import reducerAsesoria from './ducks/asesoria'
import reducerSolicitud from './ducks/solicitud'

// reducers for admin
import reducersAdminUsers from './ducks/admin/users'
import reducersAdminAsesoria from './ducks/admin/asesoria'
import reducersAdminPerfiles from './ducks/admin/perfiles'
import reducersAdminSolicitudes from './ducks/admin/solicitudes'

import { RESET_STORE } from '../consts'

const appReducer = combineReducers({
  ui: reducerUi,
  auth: reducerLogin,
  notes: reducerNotes,
  eventos: reducerEventos,
  asesoria: reducerAsesoria,
  solicitud: reducerSolicitud,
  // admin
  adminUser: reducersAdminUsers,
  adminAsesoria: reducersAdminAsesoria,
  adminPerfiles: reducersAdminPerfiles,
  adminSolicitud: reducersAdminSolicitudes
})

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}

export const composeEnhancers = compose
export default rootReducer
