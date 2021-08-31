import { takeEvery, fork, put } from "redux-saga/effects";

import DBConnection from "../api/Connection";
import { changeLoading } from "../redux/ducks/ui";
import { actionTypes, notesAllLoading } from "../redux/ducks/notes";

function* asyncLoadingNotes() {
  try {
    yield put(changeLoading(true))
    const response = yield DBConnection.instance.get('/notes/me')
    yield put(notesAllLoading({...response}))
  } catch (error) {} finally {
    yield put(changeLoading(false))
  }
}

function* watchNotes() {
  yield takeEvery(actionTypes.NOTES_LOADING_ALL, asyncLoadingNotes);
}

const rootNotes = [fork(watchNotes)];

export default rootNotes;
