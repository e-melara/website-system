import { values } from "lodash";
import { fork, takeEvery, put } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { finishLoading, startLoading } from "../redux/ducks/ui";
import { actionsTypes, loaderSubjects } from "../redux/ducks/asesoria";

// functions generator
function* asyncAsesoriaLoading() {
  yield put(startLoading());
  try {
    const { materias } = yield DBConnection.instance.get("/asesoria/me");
    const valuesMaterias = values(materias).map((e) => {
      return Object.assign({}, e, {
        visible: true,
      });
    });
    yield put(loaderSubjects(valuesMaterias));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(finishLoading());
  }
}

// function watch
function* watchAsesoria() {
  yield takeEvery(actionsTypes.ASESORIA, asyncAsesoriaLoading);
}

const rootAsesoria = [fork(watchAsesoria)];
export default rootAsesoria;
