import { put, takeEvery, fork } from "redux-saga/effects";

// types actions for watchs
import DBConnection from "../api/Connection";
import { showErrorToast } from "../utils/errors";
import { startLoading, finishLoading, initUI } from "../redux/ducks/ui";
import {
  actionType,
  actionLoginSuccess,
  checkingFinish,
} from "../redux/ducks/login";

import { KeyLocalStorage } from "../consts";
import { uiEmptyChange } from "../redux/ducks/ui";
import { initialStateAsesoria } from "../redux/ducks/asesoria";

// functions async
function* asycnLogout() {
  localStorage.removeItem("ui");
  localStorage.removeItem(KeyLocalStorage);

  yield put(uiEmptyChange());
  yield put(initialStateAsesoria());
  yield put({ type: actionType.LOGIN_LOGOUT_ASYNC });
}

function* asyncLogin(action) {
  const { username, password } = action.payload;
  yield put(startLoading());
  try {
    const resolve = yield DBConnection.instance.login(username, password);
    yield put(actionLoginSuccess(resolve));
  } catch ({ error }) {
    const { data, status } = error;
    if (status === 403) {
      showErrorToast(data);
    }
  } finally {
    yield put(finishLoading());
  }
}

function* asyncChecking() {
  try {
    const resolve = yield DBConnection.instance.post("auth/me");
    yield put(actionLoginSuccess(resolve));
    yield put(initUI());
  } catch (e) {
  } finally {
    yield put(checkingFinish());
  }
}

// functions watch
function* watchLogin() {
  yield takeEvery(actionType.LOGIN, asyncLogin);
}

function* watchChecking() {
  yield takeEvery(actionType.LOGIN_CHECKING, asyncChecking);
}

function* watchLogoutChecking() {
  yield takeEvery(actionType.LOGIN_LOGOUT, asycnLogout);
}

const rootAuthSaga = [
  fork(watchLogin),
  fork(watchChecking),
  fork(watchLogoutChecking),
];

export default rootAuthSaga;
