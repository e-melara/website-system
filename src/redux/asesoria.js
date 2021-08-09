import { isEqual } from "lodash";

// types
const ASESORIA = "[ASESORIA] ASESORIA";
const ASESORIA_ASYNC = "[ASESORIA] ASESORIA_ASYNC";
const ASESORIA_SUBJECT_SCHULES = "[ASESORIA] SUBJECT SCHULES";

export const actionsTypes = { ASESORIA, ASESORIA_ASYNC };

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

// reducers
const initialState = {
  subjects: [],
  schulesStudents: [],
};

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case ASESORIA_ASYNC:
      return { ...state, subjects: payload };
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
