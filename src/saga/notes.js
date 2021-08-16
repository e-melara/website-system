import { takeEvery, fork, put } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { startLoading, finishLoading } from "../redux/ducks/ui";
import { actionTypes, notesAllLoading } from "../redux/ducks/notes";

function* asyncLoadingNotes() {
  try {
    yield put(startLoading())
    const response = yield DBConnection.instance.get('/notes/me')
    yield put(notesAllLoading({...response}))
  } catch (error) {
    console.log(error);
  } finally {
    yield put(finishLoading())
  }
}

function* watchNotes() {
  yield takeEvery(actionTypes.NOTES_LOADING_ALL, asyncLoadingNotes);
}

const rootNotes = [fork(watchNotes)];

export default rootNotes;
