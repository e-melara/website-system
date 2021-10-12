import { message } from 'antd'
import { fork, put, takeEvery } from 'redux-saga/effects'

import DBConnection from '../../api/Connection'
import { actionsType } from '../../redux/ducks/admin/users'

// effects -> asyn
function* asyncPageUser(action) {
  const { page, search } = action.payload
  try {
    const { data, current_page, total, per_page } =
      yield DBConnection.instance.get(
        `/admin/users/all?page=${page}&search=${search}`
      )
    yield put({
      type: actionsType.pageSuccess,
      payload: {
        data,
        total,
        pageSize: per_page,
        current: current_page
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

const rootSagaRouter = [fork(watchPageUser)]

export default rootSagaRouter
