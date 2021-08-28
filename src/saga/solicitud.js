import { put, takeEvery, fork } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { actionsType } from "../redux/ducks/solicitud";
import { startLoading, finishLoading } from "../redux/ducks/ui";

// function async
function* asycnSaveSolicitud(actions) {
  try {
    yield put(startLoading());
    yield DBConnection.instance.post("/solicitud/add", actions.payload);
    yield put({
      type: actionsType.SOLICITUD_SIXTH_SUBJECT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionsType.SOLICITUD_SIXTH_SUBJECT_ERROR,
    });
  } finally {
    yield put(finishLoading());
  }
}

function* asycnLoader(actions) {
  try {
    const { payload } = actions;
    const { total, current_page, data } = yield DBConnection.instance.get(
      `/solicitud?page=${payload}`
    );
    yield put({
      type: actionsType.SOLICITUD_LOADER_DATA,
      payload : {
        data,
        total,
        current_page,
        loading: false,
      }
    })
  } catch (error) {}
}

// function watch
function* watchSaveSolicitud() {
  yield takeEvery(actionsType.SOLICITUD_SAVE, asycnSaveSolicitud);
}

function* watchLoader() {
  yield takeEvery(actionsType.SOLICITUD_LOADER, asycnLoader);
}

const rootSolicitud = [fork(watchSaveSolicitud), fork(watchLoader)];

export default rootSolicitud;
