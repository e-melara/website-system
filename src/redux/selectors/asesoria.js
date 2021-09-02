import { map, isEmpty } from "lodash";
import { createSelector } from "reselect";

const mapFun = (array = [], campus) => map(array, campus);

const enrolled = (state) => state.asesoria.enrolled;
const subjects = (state) => state.asesoria.subjects;
const approved = (state) => mapFun(state.asesoria.approved, "nopensum");

//estado de las estadistica de las materias por solicitud
export const estadisticaSolicitud = (state) => state.solicitud.estadistica;
export const solicitudOthers = (state) => state.asesoria.solicitudesOther;

// Para la verificacion de la sexta materias
export const sixthSubjectValidated = createSelector(
  [enrolled, subjects, estadisticaSolicitud],
  (enrolledSubject, posiblesSubject, objectSixth ) => {
    const filterSixthStatic = objectSixth.find(e => e['type'] === 'SEXTA')

    if(filterSixthStatic) {
      return {
        active: false,
        message:
          "Solo puedes solicitar una sexta materia una vez",
      };
    }

    if (isEmpty(enrolledSubject)) {
      return {
        active: false,
        message:
          "Para solicitar la sexta materias debes tener una asesoria activa",
      };
    }

    if (enrolledSubject.schules.length < 5) {
      return {
        active: false,
        message:
          "Para poder solicitar una sexta materias debes tener inscripta 5 materias",
      };
    }

    const subjectsSixth = map(enrolledSubject.schules, "codmate");
    const filterSixth = posiblesSubject.filter(
      (e) => !subjectsSixth.includes(e.materia)
    );

    if (filterSixth.length === 0) {
      return {
        active: false,
        message: "No hay una sexta materia a inscribir",
      };
    }

    return {
      active: true,
      subjects: filterSixth,
    };
  }
);

const pensumCodigo = (state) => {
  let array = [];
  const pensum = state.asesoria.pensum;
  pensum.forEach((element) => {
    element
      .filter((item) => !item.approved)
      .filter((item) => !item.enrolled)
      .forEach((item) => {
        array.push({
          object: item,
          code: item.codmate,
          prerequisito: item.codprere.split(","),
        });
      });
  });
  return array;
};

export const subjectsApprovateTake = createSelector(
  [pensumCodigo, approved],
  function (pensum, subjectApproved) {
    return pensum.filter(function (element) {
      let prerequisito = element.prerequisito;
      if (prerequisito.length === 1) {
        if (!prerequisito[0].endsWith("UV")) {
          const subject = parseInt(prerequisito[0]);
          if (subject === 0) {
            return true;
          }
          return subjectApproved.includes(subject);
        }
        return true;
      } else if (prerequisito.length > 1) {
        return prerequisito.every(function (element) {
          return subjectApproved.includes(element);
        });
      }
      return false;
    });
  }
);