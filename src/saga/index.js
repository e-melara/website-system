import { all } from "redux-saga/effects";

import rootNotes from "./notes";
import rootAuthSaga from "./auth";
import rootAsesoria from "./asesoria";

export default function* rootSaga() {
  yield all([...rootAuthSaga, ...rootAsesoria, ...rootNotes]);
}
