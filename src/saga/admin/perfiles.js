import { message } from 'antd'
import { takeEvery, fork, put } from 'redux-saga/effects'

import DBConnection from '../../api/Connection'
import { changeLoading } from '../../redux/ducks/ui'
import { actionsType } from '../../redux/ducks/admin/perfiles'

import { sliceModulosIsAdminOrStudent } from '../../utils/functions'

// effects
function* asyncPageLoading() {
  try {
    const { all } = yield DBConnection.instance.get('/admin/perfiles')
    yield put({
      type: actionsType.allSuccess,
      payload: { data: all }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  }
}

function* asyncFindById(action) {
  try {
    const { id } = action.payload
    yield put(changeLoading(true))
    const {
      data: { perfil, modulos, usuarios, dataModulos }
    } = yield DBConnection.instance.get(`/admin/perfiles/${id}`)

    const modulosActivos = sliceModulosIsAdminOrStudent(
      dataModulos,
      perfil.is_admin
    )

    yield put({
      type: actionsType.findByIdSuccess,
      payload: {
        perfil,
        modulos,
        usuarios,
        dataModulos: modulosActivos
      }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  } finally {
    yield put(changeLoading(false))
  }
}

function* asyncDeleteModulo(action) {
  try {
    const { id } = action.payload
    yield DBConnection.instance.post('/admin/perfiles/delete-modulo', { id })
    yield put({
      type: actionsType.deleteModuloSuccess,
      payload: {
        id
      }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  }
}

function* asyncAddPerfilModulo(action) {
  try {
    const { modulo, id } = action.payload
    const { data } = yield DBConnection.instance.post('/admin/perfiles/add', {
      modulo,
      id
    })
    yield put({
      type: actionsType.addSuccess,
      payload: { ...data }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  }
}

function* asyncAddPerfilNew(action) {
  try {
    const { nombre } = action.payload
    const { perfil } = yield DBConnection.instance.post(
      '/admin/perfiles/new-perfil',
      { nombre }
    )

    yield put({
      type: actionsType.newPerfilSuccess,
      payload: {
        ...perfil
      }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  }
}

function* asyncEditPerfil(action) {
  try {
    const { id, nombre } = action.payload
    const { perfil } = yield DBConnection.instance.post(
      '/admin/perfiles/update-perfil',
      {
        id,
        nombre
      }
    )
    yield put({
      type: actionsType.editPerfilSuccess,
      payload: { ...perfil }
    })
  } catch (error) {
    message.error(
      'Lo sentimos tenemos un problema con el servidor en este momento'
    )
  }
}

function* asyncDeletePerfil(action) {
  try {
    const { payload } = action
    yield put(changeLoading(true))
    const resolve = yield DBConnection.instance.post(
      '/admin/perfiles/delete-perfil',
      { id: payload }
    )
    message.info('El perfil fue eliminado con exito')
  } catch (error) {
    const { status } = error
    if (status === 406) {
      message.error(
        'Para poder eliminar el perfil no debe tener usuarios ni modulos registrados'
      )
    } else {
      message.error(
        'Lo sentimos tenemos un problema con el servidor en este momento'
      )
    }
  } finally {
    yield put(changeLoading(false))
  }
}

// watchs
function* watchPageLoading() {
  yield takeEvery(actionsType.all, asyncPageLoading)
}

function* watchFindById() {
  yield takeEvery(actionsType.findById, asyncFindById)
}

function* watchDeleteModulo() {
  yield takeEvery(actionsType.deleteModulo, asyncDeleteModulo)
}

function* watchAddPerfilModulo() {
  yield takeEvery(actionsType.add, asyncAddPerfilModulo)
}

function* watchAddPerfilNew() {
  yield takeEvery(actionsType.newPerfil, asyncAddPerfilNew)
}

function* watchEditPerfil() {
  yield takeEvery(actionsType.editPerfil, asyncEditPerfil)
}

function* watchDeletePerfil() {
  yield takeEvery(actionsType.deletePerfil, asyncDeletePerfil)
}

const rootPerfiles = [
  fork(watchFindById),
  fork(watchEditPerfil),
  fork(watchPageLoading),
  fork(watchAddPerfilNew),
  fork(watchDeleteModulo),
  fork(watchDeleteModulo),
  fork(watchDeletePerfil),
  fork(watchAddPerfilModulo)
]

export default rootPerfiles
