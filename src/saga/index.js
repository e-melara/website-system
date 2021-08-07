import { all } from "redux-saga/effects";

import rootAuthSaga from "./auth";

export default function* rootSaga() {
  yield all([...rootAuthSaga]);
}
