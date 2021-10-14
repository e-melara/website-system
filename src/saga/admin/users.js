import { message } from 'antd'
import { fork, put, takeEvery } from 'redux-saga/effects'

import DBConnection from '../../api/Connection'
import { actionsType } from '../../redux/ducks/admin/users'

// effects -> asyn
function* asyncPageUser(action) {
  const { page, search } = action.payload
  try {
    const {
      perfiles,
      paginate: { data, current_page, total, per_page }
    } = yield DBConnection.instance.get(
      `/admin/users/all?page=${page}&search=${search}`
    )
    yield put({
      type: actionsType.pageSuccess,
      payload: {
        data,
        total,
        perfiles,
        pageSize: per_page,
        current: current_page
      }
    })
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
  }
}

function* asyncDarBajaUser(action) {
  try {
    const { id, estado } = action.payload
    yield DBConnection.instance.post('/admin/users/darbaja', {
      id,
      estado
    })
    message.success('La accion fue realizada con exito')
    yield put({
      type: actionsType.darBajaSuccess,
      payload: { id, estado }
    })
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
  }
}

function* asyncPasswordChange(action) {
  try {
    const { password, usuario } = action.payload
    yield DBConnection.instance.post('/admin/users/password', {
      password,
      usuario
    })
    yield put({
      type: actionsType.passwordSuccess,
      payload: {
        loading: false
      }
    })
    message.success('La accion fue realizada con exito')
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
  }
}

function* asyncPefil(action) {
  try {
    const { perfil, usuario } = action.payload
    const { perfils } = yield DBConnection.instance.post(
      '/admin/users/perfil',
      {
        perfil,
        usuario
      }
    )
    message.success('La accion fue realizada con exito')
    yield put({
      type: actionsType.perfilSuccess,
      payload: {
        perfils,
        usuario
      }
    })
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
  }
}

function* asynNameLastChange(action) {
  try {
    const { apellidos, nombres, usuario } = action.payload
    yield DBConnection.instance.post('/admin/users/name-last', {
      apellidos,
      nombres,
      usuario
    })
    yield put({
      type: actionsType.nameLastSuccess,
      payload: {
        ...action.payload
      }
    })
  } catch (error) {
    message.error('Por el momento tenemos un problema intenta mas tarde')
  }
}

// watcth
function* watchPageUser() {
  yield takeEvery(actionsType.page, asyncPageUser)
}

function* watchUserDarBaja() {
  yield takeEvery(actionsType.darBaja, asyncDarBajaUser)
}

function* watchChangePassword() {
  yield takeEvery(actionsType.password, asyncPasswordChange)
}

function* watchChangePerfil() {
  yield takeEvery(actionsType.perfil, asyncPefil)
}

function* watchChangeNameLast() {
  yield takeEvery(actionsType.nameLast, asynNameLastChange)
}

const rootSagaRouter = [
  fork(watchPageUser),
  fork(watchUserDarBaja),
  fork(watchChangePerfil),
  fork(watchChangePassword),
  fork(watchChangeNameLast)
]

export default rootSagaRouter
