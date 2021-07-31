import { values } from "lodash";
import { axiosConfig } from "../config/axios";
import { startLoading, finishLoading } from "./ui";

// constantes
const ASESORIA_SUCCESS = "[ASESORIA] SUCCESS";
const ASESORIA_SCHULES_SUBJECTS = "[ASESORIA] SCHULES SUBJECTS";

// reducers
const initialState = {
  subjects: [],
  schules: [],
};

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case ASESORIA_SUCCESS:
      return {
        ...state,
        schules: [],
        subjects: payload,
      };
    case ASESORIA_SCHULES_SUBJECTS:
      return {
        ...state,
        schules: payload,
      };
    default:
      return state;
  }
}

export default reducers;

// actions
export const addSubjects = (payload) => ({
  type: ASESORIA_SUCCESS,
  payload,
});

export const addSchules = (payload) => ({
  type: ASESORIA_SCHULES_SUBJECTS,
  payload,
})

export const loaderSubjectsAsesoria = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axiosConfig
      .get("/asesoria/me")
      .then((response) => {
        const { materias } = response.data;
        const arraySubjects = values(materias);
        dispatch(addSubjects(arraySubjects));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        dispatch(finishLoading());
      });
  };
};

export const scheduleSubject = (subject) => {
  return (dispatch) => {
    dispatch(startLoading());
    axiosConfig
      .post("/asesoria/horario", { subject })
      .then((response) => {
        const { schules } = response.data;
        dispatch(addSchules(schules))
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};
