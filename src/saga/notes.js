import { takeEvery, fork, put } from "redux-saga/effects";

import { actionTypes } from "../redux/ducks/notes";

function* asyncLoadingNotes() {
  try {
  } catch (error) {}
}

function* watchNotes() {
  yield takeEvery(actionTypes.NOTES_LOADING_ALL, asyncLoadingNotes);
}

const rootNotes = [fork(watchNotes)];

export default rootNotes;
