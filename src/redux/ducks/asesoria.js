import { isEqual } from "lodash";

// types
const ASESORIA = "[ASESORIA] ASESORIA";
const ASESORIA_EMPTY = "[ASESORIA] EMPTY";
const ASESORIA_ASYNC = "[ASESORIA] ASESORIA_ASYNC";
const ASESORIA_SUBJECT_SCHULES = "[ASESORIA] SUBJECT SCHULES";

// Types actions asesoria Enrolled
const ASESORIA_SUBJECT_ENROLLED_DELETED = "[ASESORIA ENROLLED] DELETE SCHULES";

export const actionsTypes = {
  ASESORIA,
  ASESORIA_EMPTY,
  ASESORIA_ASYNC,
  ASESORIA_SUBJECT_SCHULES,
  ASESORIA_SUBJECT_ENROLLED_DELETED,
};

// actions
export const startLoadingAsesoria = () => ({ type: ASESORIA });
export const loaderSubjects = (materias) => ({
  type: ASESORIA_ASYNC,
  payload: materias,
});

export const selectionSubjectSchules = (object) => ({
  type: ASESORIA_SUBJECT_SCHULES,
  payload: { ...object },
});

export const deleteSchulesSubject = (payload) => ({
  type: ASESORIA_SUBJECT_ENROLLED_DELETED,
  payload,
});

export const initialStateAsesoria = () => ({ type: ASESORIA_EMPTY });

// reducers
const initialState = {
  subjects: [],
  schulesStudents: [],
};

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case ASESORIA_EMPTY:
      return initialState;
    case ASESORIA_ASYNC:
      return { ...state, subjects: payload };
    case ASESORIA_SUBJECT_ENROLLED_DELETED:
      return {
        ...state,
        schulesStudents: state.schulesStudents.filter(
          (e) => e.subject.materia !== payload.materia
        ),
        subjects: state.subjects.map(function (item) {
          if (isEqual(item.materia, payload.materia)) {
            item.visible = true;
          }
          return item;
        }),
      };
    case ASESORIA_SUBJECT_SCHULES:
      return {
        ...state,
        schulesStudents: state.schulesStudents.concat(payload),
        subjects: state.subjects.map(function (item) {
          if (isEqual(item.materia, payload.subject.materia)) {
            item.visible = false;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export default reducers;
