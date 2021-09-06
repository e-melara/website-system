import { fork, put, takeEvery } from "@redux-saga/core/effects";

import DBConnection from "../../api/Connection";
import { actionsType } from "../../redux/ducks/admin/asesoria";

function* asycnLoadingAdminAsesoria(actions) {
  const { page } = actions;
  try {
    const _page = page || 1;
    const { data, current_page, total } = yield DBConnection.instance.get(
      `admin/asesoria?page=${_page}`
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

function* watchAdminAsesoria() {
  yield takeEvery(
    actionsType.ASESORIA_ADMIN_LOADING,
    asycnLoadingAdminAsesoria
  );
}

const rootAdminAsesoria = [fork(watchAdminAsesoria)];

export default rootAdminAsesoria;
