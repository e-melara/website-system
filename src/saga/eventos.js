import { put, takeEvery, fork } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { actionsType, eventosSuccess } from "../redux/ducks/eventos";

// funcions asycn
function* asyncLoadingEventos(actions) {
  try {
    const payload = actions.payload;
    let url = payload ? `eventos?date=${payload}` : "eventos";
    const resolve = yield DBConnection.instance.get(url);
    yield put(eventosSuccess(resolve));
  } catch (error) {}
}

// functions watch
function* wacthLoadingEvents() {
  yield takeEvery(actionsType.LOADING_EVENTOS, asyncLoadingEventos);
}

const root = [fork(wacthLoadingEvents)];
export default root;
