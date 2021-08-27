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

// function watch
function* watchSaveSolicitud() {
  yield takeEvery(actionsType.SOLICITUD_SAVE, asycnSaveSolicitud);
}

const rootSolicitud = [fork(watchSaveSolicitud)];

export default rootSolicitud;
