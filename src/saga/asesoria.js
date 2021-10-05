import { message } from 'antd'
import { fork, takeEvery, put } from 'redux-saga/effects'

import DBConnection from '../api/Connection'
import { changeLoading } from '../redux/ducks/ui'
import { arancelesCuota } from '../utils/functions'

import {
  actionsTypes,
  loaderSubjects,
  pensumLoadingAll,
  asesoriaReponseSend,
  pensumAddAllSuccess
} from '../redux/ducks/asesoria'

import {
  propsToEnrolled,
  mapSubjectsActive,
  forEachPensumArrayToProps
} from '../utils/pensum'

function* asyncLoadingPensum() {
  try {
    let payload = {
      subjects: [],
      enrolled: {},
      pensum: [],
      active: false
    }

    yield put(changeLoading(true))
    const { active, pensum, take, approved, enrolleds, reprobadas } =
      yield DBConnection.instance.get('/asesoria/pensum')

    payload.active = active
    payload.approved = approved
    payload.subjects = mapSubjectsActive(take)
    if (active) {
      payload.enrolled = propsToEnrolled(enrolleds)
    }

    const pensumArray = forEachPensumArrayToProps(
      pensum,
      approved,
      take,
      enrolleds,
      reprobadas
    )
    payload.pensum = pensumArray
    yield put(pensumAddAllSuccess({ ...payload }))
  } catch (error) {
    console.error(error)
  } finally {
    yield put(changeLoading(false))
  }
}

function* asyncAsesoriaLoading() {
  yield put(changeLoading(true))
  try {
    const { materias, active, data } = yield DBConnection.instance.get(
      '/asesoria/me'
    )
    if (active) {
      let enrolleds = propsToEnrolled(data)
      yield put(asesoriaReponseSend(enrolleds))
    } else {
      const valuesMaterias = mapSubjectsActive(materias)
      yield put(loaderSubjects(valuesMaterias))
    }
  } catch (error) {
    console.error(error)
  } finally {
    yield put(changeLoading(false))
  }
}

// FIXED: Reparar la parte del estado cuando se guarda
function* asyncAsesoriaRequest(actions) {
  yield put(changeLoading(true))
  try {
    const { codCargas, phone } = actions.payload
    yield DBConnection.instance.post('/asesoria/registro', {
      codCargas,
      phone
    })
    message.info('Tu inscripcion ha sido registrada con exito')
    yield put(pensumLoadingAll())
  } catch (error) {
    message.error(error.message)
  } finally {
    yield put(changeLoading(false))
  }
}

// Solicitudes

function* asyncSolicitudPost(actions) {
  const payload = actions.payload
  try {
    yield put(changeLoading(true))
    const type = payload.type
    const { solicitud } = yield DBConnection.instance.post(
      '/solicitud/add',
      payload
    )

    if (type === 'SEXTA') {
      yield put({
        type: actionsTypes.SOLICITUD_ADD_SUCCESS_EXTRA,
        payload: solicitud
      })
    } else {
      yield put({
        type: actionsTypes.SOLICITUD_ADD_SUCCESS_OTHERS,
        payload: solicitud
      })
    }
  } catch (error) {
  } finally {
    yield put(changeLoading(false))
  }
}

// loading aranceles
function* asycnSolicitudAranceles() {
  try {
    yield put(changeLoading(true))
    const {
      exist,
      data: { aranceles, bancos }
    } = yield DBConnection.instance.post('/asesoria/aranceles')
    let arregloData = [];
    if(!exist) {
      arregloData = arancelesCuota(aranceles)
    }

    yield put({
      type: actionsTypes.SOLICITUD_ARANCELES_SUCCESS,
      payload: { arregloData, bancos, exist }
    })
  } catch (error) {
    console.error(error)
  } finally {
    yield put(changeLoading(false))
  }
}

function* aysncAsesoriaArancelesPost(actions) {
  const { payload } = actions
  try {
    yield put(changeLoading(true))
    yield DBConnection.instance.upload('/asesoria/aranceles/pago', payload)
    yield put({
      type: actionsTypes.SOLICITUD_ARANCELES_POST_SAVE_SUCCESS
    })
    message.info('La peticion ha sido realizada con exito')
  } catch (error) {
    message.error(
      'Por el momento tenemos un error en el sistema intenta mas tarde'
    )
  } finally {
    yield put(changeLoading(false))
  }
}

// function watch
function* watchAsesoria() {
  yield takeEvery(actionsTypes.ASESORIA, asyncAsesoriaLoading)
}

function* watchAsesoriaRequest() {
  yield takeEvery(actionsTypes.ASESORIA_REQUEST_SEND, asyncAsesoriaRequest)
}

// funcion para cargar las informacion del pensum
function* watchPensumLoadingAll() {
  yield takeEvery(actionsTypes.PENSUM_LOADING_ALL, asyncLoadingPensum)
}

// function para solicitudes
function* watchSolicitudesAll() {
  yield takeEvery(actionsTypes.SOLICITUD_ADD_POST, asyncSolicitudPost)
}

// function para la carga de los aranceles
function* watchSolicitudAranceles() {
  yield takeEvery(actionsTypes.SOLICITUD_ARANCELES, asycnSolicitudAranceles)
}

function* watchSolicitudArancelesPost() {
  yield takeEvery(
    actionsTypes.SOLICITUD_ARANCELES_POST_SAVE,
    aysncAsesoriaArancelesPost
  )
}

const rootAsesoria = [
  fork(watchAsesoria),
  fork(watchSolicitudesAll),
  fork(watchAsesoriaRequest),
  fork(watchPensumLoadingAll),
  fork(watchSolicitudAranceles),
  fork(watchSolicitudArancelesPost)
]
export default rootAsesoria
