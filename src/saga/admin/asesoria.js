import { message } from 'antd'
import moment from 'moment'
import { fork, put, takeEvery } from '@redux-saga/core/effects'

import DBConnection from '../../api/Connection'
import { changeLoading } from '../../redux/ducks/ui'
import { actionsType } from '../../redux/ducks/admin/asesoria'

// utils
import {
  arrayAsesoriaArreglo,
  selectedRowsKey
} from '../../utils/admin/asesoria'

function* asycnLoadingAdminAsesoria({ payload }) {
  const { page, estado, search, type } = payload || {
    page: 1,
    estado: 'A',
    search: '',
    type: 1
  }
  try {
    const { data, current_page, total, per_page } =
      yield DBConnection.instance.get(
        `admin/asesoria?page=${page}&estado=${estado}&search=${search}&type=${type}`
      )
    yield put({
      type: actionsType.ASESORIA_ADMIN_LOADING_SUCCESS,
      payload: {
        data,
        total,
        to: per_page,
        current: current_page
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function* asyncLoadingCurrent(actions) {
  try {
    let { id } = actions.payload
    const { enrolled } = yield DBConnection.instance.get(`admin/asesoria/${id}`)

    let { id: idEnrolled, estado, schules, pago } = enrolled
    const enrolledSubject = arrayAsesoriaArreglo(schules)
    const selectedRowsKeyArray = selectedRowsKey(enrolledSubject)

    yield put({
      type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS,
      payload: {
        pago,
        estado,
        id: idEnrolled,
        selectedRowsKeyArray,
        enrolled: enrolledSubject
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function* asyncLoadingAddType(actions) {
  try {
    yield put(changeLoading(true))
    yield DBConnection.instance.post(`admin/asesoria`, actions.payload)
    yield put({
      type: actionsType.ASESORIA_ADMIN_ADD_TYPE_SUCCESS,
      payload: actions.payload.id
    })
    message.info('El proceso con las asesoria has sido evaludad con exito')
  } catch (error) {
    message.error('Por el momento tenemos un error intenta mas tarde')
    console.error(error)
  } finally {
    yield put(changeLoading(false))
  }
}

function* asyncAsesoriaEnrolled(actions) {
  const { payload } = actions
  try {
    yield put(changeLoading(true))
    const { id } = yield DBConnection.instance.post(
      '/admin/asesoria/enrolled',
      {
        id: payload
      }
    )
    message.success('La inscripcion fue un exito!')
    yield put({
      type: actionsType.ASESORIA_ADMIN_MATRICULAR_SUCCESS,
      payload: id
    })
  } catch (error) {
  } finally {
    yield put(changeLoading(false))
  }
}

function* asyncAsesoriaConfiguration() {
  try {
    const { data } = yield DBConnection.instance.get('/config')
    yield put({
      type: actionsType.ASESORIA_CONFIGURACION_SUCCESS,
      payload: {
        extra: data.extra,
        valor: data.valor,
        loading: true
      }
    })
  } catch (error) {}
}

function* asyncSaveConfiguration(action) {
  try {
    yield put(changeLoading(true))
    const { asesoria, fecha_max } = action.payload
    const dateValidad = moment(fecha_max).format('YYYY-MM-DD')
    const {
      object: { valor, extra }
    } = yield DBConnection.instance.post('/config', {
      asesoria,
      fecha: dateValidad
    })
    yield put({
      type: actionsType.ASESORIA_CONFIGURATION_SAVE_SUCCESS,
      payload: {
        valor,
        extra
      }
    })
    message.info('El proceso fue realizado con exito')
  } catch (error) {
    message.error('Por el momento tenemos un error intenta mas tarde')
  } finally {
    yield put(changeLoading(false))
  }
}

function* watchAdminAsesoria() {
  yield takeEvery(actionsType.ASESORIA_ADMIN_LOADING, asycnLoadingAdminAsesoria)
}

function* watchAdminAsesoriaCurrent() {
  yield takeEvery(
    actionsType.ASESORIA_ADMIN_CURRENT_SELECT,
    asyncLoadingCurrent
  )
}

function* watchAdminAsesoriaAddType() {
  yield takeEvery(actionsType.ASESORIA_ADMIN_ADD_TYPE, asyncLoadingAddType)
}

// matricular alumno
function* watchAdminEnrolled() {
  yield takeEvery(actionsType.ASESORIA_ADMIN_MATRICULAR, asyncAsesoriaEnrolled)
}

function* watchDataAsesoria() {
  yield takeEvery(
    actionsType.ASESORIA_CONFIGURACION,
    asyncAsesoriaConfiguration
  )
}

function* watchSaveConfiguration() {
  yield takeEvery(
    actionsType.ASESORIA_CONFIGURATION_SAVE,
    asyncSaveConfiguration
  )
}

const rootAdminAsesoria = [
  fork(watchDataAsesoria),
  fork(watchAdminAsesoria),
  fork(watchAdminEnrolled),
  fork(watchAdminAsesoriaCurrent),
  fork(watchAdminAsesoriaAddType),
  fork(watchSaveConfiguration)
]

export default rootAdminAsesoria
