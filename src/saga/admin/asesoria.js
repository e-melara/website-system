import { message } from "antd";
import { fork, put, takeEvery } from "@redux-saga/core/effects";

import DBConnection from "../../api/Connection";
import { changeLoading } from "../../redux/ducks/ui";
import { actionsType } from "../../redux/ducks/admin/asesoria";

// utils
import {
  arrayAsesoriaArreglo,
  selectedRowsKey,
} from "../../utils/admin/asesoria";

function* asycnLoadingAdminAsesoria({ payload }) {
  const { page, estado, search } = payload || {
    estado: "A",
    page: 1,
    search: "",
  };
  try {
    const { data, current_page, total } = yield DBConnection.instance.get(
      `admin/asesoria?page=${page}&estado=${estado}&search=${search}`
    );
    yield put({
      type: actionsType.ASESORIA_ADMIN_LOADING_SUCCESS,
      payload: {
        data,
        total,
        current: current_page,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function* asyncLoadingCurrent(actions) {
  try {
    let { id } = actions.payload;
    const { enrolled } = yield DBConnection.instance.get(
      `admin/asesoria/${id}`
    );

    let { id: idEnrolled, estado, schules } = enrolled;
    const enrolledSubject = arrayAsesoriaArreglo(schules);
    const selectedRowsKeyArray = selectedRowsKey(enrolledSubject);

    yield put({
      type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_SUCCESS,
      payload: {
        estado,
        id: idEnrolled,
        selectedRowsKeyArray,
        enrolled: enrolledSubject,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function* asyncLoadingAddType(actions) {
  try {
    yield put(changeLoading(true));
    yield DBConnection.instance.post(`admin/asesoria`, actions.payload);
    yield put({
      type: actionsType.ASESORIA_ADMIN_ADD_TYPE_SUCCESS,
      payload: actions.payload.id,
    });
    message.info("El proceso con las asesoria has sido evaludad con exito");
  } catch (error) {
    message.error("Por el momento tenemos un error intenta mas tarde");
    console.error(error);
  } finally {
    yield put(changeLoading(false));
  }
}

function* watchAdminAsesoria() {
  yield takeEvery(
    actionsType.ASESORIA_ADMIN_LOADING,
    asycnLoadingAdminAsesoria
  );
}

function* watchAdminAsesoriaCurrent() {
  yield takeEvery(
    actionsType.ASESORIA_ADMIN_CURRENT_SELECT,
    asyncLoadingCurrent
  );
}

function* watchAdminAsesoriaAddType() {
  yield takeEvery(actionsType.ASESORIA_ADMIN_ADD_TYPE, asyncLoadingAddType);
}

const rootAdminAsesoria = [
  fork(watchAdminAsesoria),
  fork(watchAdminAsesoriaCurrent),
  fork(watchAdminAsesoriaAddType),
];

export default rootAdminAsesoria;
