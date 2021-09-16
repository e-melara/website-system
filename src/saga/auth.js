import { message } from "antd";
import { put, takeEvery, fork } from "redux-saga/effects"; // types actions for watchs
import DBConnection from "../api/Connection";
import { checkingFinish } from "../redux/ducks/login";
import { KeyLocalStorage, RESET_STORE } from "../consts";
import { actionsType } from "../redux/ducks/ui";
import { actionType, actionLoginSuccess } from "../redux/ducks/login";

function* asyncLogin(action) {
  const { username, password } = action.payload;
  try {
    const {
      carrera,
      rol: { perfil, routes, rol },
      usuario,
    } = yield DBConnection.instance.login(username, password);
    yield put(
      actionLoginSuccess({
        usuario,
        routes,
        perfil,
        carrera: rol !== "IS_ADMIN" && carrera,
      })
    );
  } catch ({ error }) {
    const { data, status } = error;
    if (status === 403) {
      message.error(data.message);
    }
  }
}

function* asyncChecking() {
  try {
    const {
      usuario,
      carrera,
      rol: { perfil, routes, rol },
    } = yield DBConnection.instance.post("auth/me");
    yield put(
      actionLoginSuccess({
        perfil,
        usuario,
        routes,
        carrera: rol !== "IS_ADMIN" && carrera,
        rol: rol === "IS_ADMIN" ? rol : "IS_STUDENT",
      })
    );
    yield put({
      type: actionsType.UI,
      payload: {
        open: localStorage.getItem("open") || true,
        theme: localStorage.getItem("theme") || "dark",
        loading: false,
      },
    });
  } catch (e) {
  } finally {
    yield put(checkingFinish());
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
