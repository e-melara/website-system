import { message } from 'antd'
import { fork, put, takeEvery } from 'redux-saga/effects'

import DBConnection from '../../api/Connection'
import { changeLoading } from '../../redux/ducks/ui'
import { actionsType } from '../../redux/ducks/admin/solicitudes'

// effects
function* asyncLoadingPage({ payload }) {
  try {
    const { page, search, type } = payload || {
      page: 1,
      search: '',
      type: 2
    }
    const { data, current_page, total } = yield DBConnection.instance.get(
      `/admin/solicitudes?page=${page}&search=${search}&type=${type}`
    )
    yield put({
      type: actionsType.SOLICITUD_ADMIN_LOADING_SUCCESS,
      payload: {
        data,
        total,
        current: current_page
      }
    })
  } catch (error) {
    console.log(error)
  }
}

function* asyncSelectionCurrent({ payload }) {
  const { id} = payload
  try {
    const { data, solicitud } = yield DBConnection.instance.get(
      `/admin/solicitudes/${id}`
    )

    yield put({
      type: actionsType.SOLICITUD_ADMIN_CURRENT_SELECT_SUCCESS,
      payload: {
        id,
        data,
        solicitud
      }
    })
  } catch (error) {
    console.log(error)
  }
}

function* asyncSendSolicitud(actions) {
  try {
    const { payload } = actions
    yield put(changeLoading(true))
    const { id } = yield DBConnection.instance.post(
      '/admin/solicitudes',
      payload
    )
    message.success('Proceso realizado con exito!')
    yield put({
      type: actionsType.SOLICITUD_ADMIN_SEND_SUCCESS,
      payload: {
        id
      }
    })
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
    console.log(error)
  } finally {
    yield put(changeLoading(false))
  }
}

// watch
function* watchSolicitudPage() {
  yield takeEvery(actionsType.SOLICITUD_ADMIN_LOADING, asyncLoadingPage)
}

function* watchSolicitudCurrentById() {
  yield takeEvery(
    actionsType.SOLICITUD_ADMIN_CURRENT_SELECT,
    asyncSelectionCurrent
  )
}

function* watchSendSolicitud() {
  yield takeEvery(actionsType.SOLICITUD_ADMIN_SEND, asyncSendSolicitud)
}

// routes for app
const rootSolicitudes = [
  fork(watchSolicitudPage),
  fork(watchSendSolicitud),
  fork(watchSolicitudCurrentById)
]

export default rootSolicitudes
