import { values } from "lodash";
import { axiosConfig } from "../config/axios";
import { startLoading, finishLoading } from "./ui";
import { showErrorToast, axiosErrorHandler } from "../utils/errors";

// constantes
const ASESORIA_SUCCESS = "[ASESORIA] SUCCESS";

// reducers
const initialState = {
  subjects: [],
};

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case ASESORIA_SUCCESS:
      return {
        ...state,
        subjects: payload,
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

export const loaderSubjectsAsesoria = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const {
        data: { materias },
      } = await axiosConfig().get("/asesoria/me");
      dispatch(addSubjects(values(materias)));
    } catch (error) {
      axiosErrorHandler(error, function ({ data, status }) {
        if (status === 403) {
          showErrorToast(data);
        }
      });
    } finally {
      dispatch(finishLoading());
    }
  };
};
