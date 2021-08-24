import { toast } from "react-toastify";
import { fork, takeEvery, put } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { finishLoading, startLoading } from "../redux/ducks/ui";

import {
  actionsTypes,
  loaderSubjects,
  pensumLoadingAll,
  asesoriaReponseSend,
  pensumAddAllSuccess,
} from "../redux/ducks/asesoria";

import {
  propsToEnrolled,
  mapSubjectsActive,
  forEachPensumArrayToProps,
} from "../utils/pensum";

function* asyncLoadingPensum() {
  try {
    let payload = {
      subjects: [],
      enrolled: {},
      pensum: [],
      active: false,
      solicitudesSexta: [],
      solicitudesOther: [],
    };

    yield put(startLoading());
    const { active, pensum, take, approved, enrolleds, reprobadas, solicitud } =
      yield DBConnection.instance.get("/asesoria/pensum");

    payload.active = active;
    payload.approved = approved;
    payload.subjects = mapSubjectsActive(take);
    if (active) {
      payload.enrolled = propsToEnrolled(enrolleds);
    }

    payload.solicitudesSexta = solicitud.sexta;
    payload.solicitudesOther = solicitud.other;
    
    const pensumArray = forEachPensumArrayToProps(
      pensum,
      approved,
      take,
      enrolleds,
      reprobadas
    );
    payload.pensum = pensumArray;
    yield put(pensumAddAllSuccess({ ...payload }));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(finishLoading());
  }
}

function* asyncAsesoriaLoading() {
  yield put(startLoading());
  try {
    const { materias, active, data } = yield DBConnection.instance.get(
      "/asesoria/me"
    );
    if (active) {
      let enrolleds = propsToEnrolled(data);
      yield put(asesoriaReponseSend(enrolleds));
    } else {
      const valuesMaterias = mapSubjectsActive(materias);
      yield put(loaderSubjects(valuesMaterias));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(finishLoading());
  }
}

// FIXED: Reparar la parte del estado cuando se guarda
function* asyncAsesoriaRequest(actions) {
  yield put(startLoading());
  try {
    const { codCargas, phone } = actions.payload;
    yield DBConnection.instance.post("/asesoria/registro", {
      codCargas,
      phone,
    });
    toast.info("Tu inscripcion ha sido registrada con exito");
    yield put(pensumLoadingAll());
  } catch (error) {
    toast.error(error.message);
  } finally {
    yield put(finishLoading());
  }
}

// Solicitudes

function* asyncSolicitudPost(actions) {
  const payload = actions.payload;
  try {
    yield put(startLoading());
    const type = payload.type;
    const { solicitud } = yield DBConnection.instance.post(
      "/solicitud/add",
      payload
    );

    if (type === "SEXTA") {
      yield put({
        type: actionsTypes.SOLICITUD_ADD_SUCCESS_EXTRA,
        payload: solicitud,
      });
    } else {
      yield put({
        type: actionsTypes.SOLICITUD_ADD_SUCCESS_OTHERS,
        payload: solicitud,
      });
    }
  } catch (error) {
  } finally {
    yield put(finishLoading());
  }
}

// function watch
function* watchAsesoria() {
  yield takeEvery(actionsTypes.ASESORIA, asyncAsesoriaLoading);
}

function* watchAsesoriaRequest() {
  yield takeEvery(actionsTypes.ASESORIA_REQUEST_SEND, asyncAsesoriaRequest);
}

// funcion para cargar las informacion del pensum
function* watchPensumLoadingAll() {
  yield takeEvery(actionsTypes.PENSUM_LOADING_ALL, asyncLoadingPensum);
}

// function para solicitudes
function* watchSolicitudesAll() {
  yield takeEvery(actionsTypes.SOLICITUD_ADD_POST, asyncSolicitudPost);
}

const rootAsesoria = [
  fork(watchAsesoria),
  fork(watchAsesoriaRequest),
  fork(watchPensumLoadingAll),
  fork(watchSolicitudesAll),
];
export default rootAsesoria;
