import { all } from "redux-saga/effects";

import rootAuthSaga from "./auth";
import rootAsesoria from "./asesoria";

export default function* rootSaga() {
  yield all([...rootAuthSaga, ...rootAsesoria]);
}
