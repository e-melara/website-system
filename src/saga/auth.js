import { put, takeEvery, fork } from "redux-saga/effects";

// types actions for watchs
import DBConnection from "../api/Connection";
import { showErrorToast } from "../utils/errors";
import { startLoading, finishLoading, initUI } from "../redux/ui";
import { actionType, actionLoginSuccess, checkingFinish } from "../redux/login";

// functions async
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

const rootAuthSaga = [fork(watchLogin), fork(watchChecking)];

export default rootAuthSaga;
