import { map } from "lodash";
import { message } from "antd";
import { put, takeEvery, fork } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { actionsType } from "../redux/ducks/solicitud";
import { changeLoading } from "../redux/ducks/ui";

// function async
function* asycnSaveSolicitud(actions) {
  try {
    yield put(changeLoading(true));
    yield DBConnection.instance.post("/solicitud/add", actions.payload);
    yield put({
      type: actionsType.SOLICITUD_SIXTH_SUBJECT_SUCCESS,
    });
    message.success('La solicitud ha sido enviada con exito')
  } catch (error) {
    yield put({
      type: actionsType.SOLICITUD_SIXTH_SUBJECT_ERROR,
    });
  } finally {
    yield put(changeLoading(false));
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
      payload: {
        data,
        total,
        current_page,
        loading: false,
      },
    });
  } catch (error) {}
}

function* asyncLoadderInitial() {
  try {
    const paginator = DBConnection.instance.get("/solicitud?page=1");
    const estadistica = DBConnection.instance.get("/solicitud/estadistica");
    const [paginatorState, stadisticState] =
      yield DBConnection.instance.morePromise([paginator, estadistica]);

    yield put({
      type: actionsType.SOLICITUD_LOADER_DATA,
      payload: Object.assign({}, paginatorState, {
        loading: false,
      }),
    });
    yield put({
      type: actionsType.SOLICITUD_INITIAL_SUCCESS,
      payload: {
        materias: map(stadisticState.materias, 'codmate'),
        stadistic: stadisticState.stadistic,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

// function watch
function* watchSaveSolicitud() {
  yield takeEvery(actionsType.SOLICITUD_SAVE, asycnSaveSolicitud);
}

function* watchLoader() {
  yield takeEvery(actionsType.SOLICITUD_LOADER, asycnLoader);
}

function* watchInitialState() {
  yield takeEvery(actionsType.SOLICITUD_INITIAL, asyncLoadderInitial);
}

const rootSolicitud = [
  fork(watchSaveSolicitud),
  fork(watchLoader),
  fork(watchInitialState),
];

export default rootSolicitud;
