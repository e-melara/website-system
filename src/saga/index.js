import { all } from 'redux-saga/effects'

import rootNotes from './notes'
import rootAuthSaga from './auth'
import rootEventos from './eventos'
import rootAsesoria from './asesoria'
import rootSolicitud from './solicitud'

// admin for saga
import rootAdminUser from './admin/users'
import rootAdminAsesoria from './admin/asesoria'
import rootAdminSolicitud from './admin/solicitud'

export default function* rootSaga() {
  yield all([
    ...rootNotes,
    ...rootAuthSaga,
    ...rootEventos,
    ...rootAsesoria,
    ...rootAdminUser,
    ...rootSolicitud,
    ...rootAdminAsesoria,
    ...rootAdminSolicitud
  ])
}
