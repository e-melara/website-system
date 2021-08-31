import { put, takeEvery, fork } from "redux-saga/effects";

// types actions for watchs
import DBConnection from "../api/Connection";
import { showErrorToast } from "../utils/errors";
import { checkingFinish } from "../redux/ducks/login";
import { KeyLocalStorage, RESET_STORE } from "../consts";
import { changeLoading, actionsType } from "../redux/ducks/ui";
import { actionType, actionLoginSuccess } from "../redux/ducks/login";

function* asyncLogin(action) {
  const { username, password } = action.payload;
  yield put(changeLoading(true));
  try {
    const resolve = yield DBConnection.instance.login(username, password);
    yield put(
      actionLoginSuccess(
        Object.assign({
          perfil: resolve.rol.perfil,
          routes: resolve.rol.routes,
          usuario: resolve.usuario,
          carrera: resolve.rol.rol === "IS_ADMIN" ? null : resolve.carrera,
        })
      )
    );
  } catch ({ error }) {
    const { data, status } = error;
    if (status === 403) {
      showErrorToast(data);
    }
  } finally {
    yield put(changeLoading(false));
  }
}

function* asyncChecking() {
  try {
    yield put(changeLoading(true));
    const resolve = yield DBConnection.instance.post("auth/me");
    yield put(
      actionLoginSuccess(
        Object.assign({
          perfil: resolve.rol.perfil,
          routes: resolve.rol.routes,
          usuario: resolve.usuario,
          carrera: resolve.rol.rol === "IS_ADMIN" ? null : resolve.carrera,
        })
      )
    );
  } catch (e) {
  } finally {
    yield put(checkingFinish());
    yield put({
      type: actionsType.UI,
      payload: {
        open: localStorage.getItem("open") || true,
        theme: localStorage.getItem("theme") || "dark",
        loading: false,
      },
    });
  }
}

function* asyncLogout() {
  localStorage.removeItem(KeyLocalStorage);
  yield put({ type: RESET_STORE });
}

// functions watch
function* watchLogin() {
  yield takeEvery(actionType.LOGIN, asyncLogin);
}

function* watchChecking() {
  yield takeEvery(actionType.LOGIN_CHECKING, asyncChecking);
}

function* watchLogout() {
  yield takeEvery(actionType.LOGIN_LOGOUT, asyncLogout);
}

const rootAuthSaga = [fork(watchLogin), fork(watchChecking), fork(watchLogout)];

export default rootAuthSaga;
