import { map, isEmpty } from "lodash";
import { createSelector } from "reselect";

const mapFun = (array = [], campus) => map(array, campus);

const enrolled = (state) => state.asesoria.enrolled;
const subjects = (state) => state.asesoria.subjects;
const solicitudes = (state) => state.asesoria.solicitudesSexta;
const approved = (state) => mapFun(state.asesoria.approved, "nopensum");

export const solicitudOthers = (state) => state.asesoria.solicitudesOther;

export const validateSextaSubject = createSelector(
  [enrolled, subjects, solicitudes],
  (enrolledSubject, subjectsPosibles, sextaMateria) => {
    if (!isEmpty(enrolledSubject)) {
      const length = enrolledSubject.schules.length;
      if (sextaMateria.length > 0) {
        return {
          active: true,
          inscripta: true,
          subjects: sextaMateria,
        };
      }

      if (length >= 5) {
        const codEnrolleds = mapFun(enrolledSubject.schules, "codmate");
        const posiblesMaterias = subjectsPosibles.filter(function (element) {
          return !codEnrolleds.includes(element.materia);
        });

        if (posiblesMaterias.length > 0) {
          return {
            active: true,
            inscripta: false,
            subjects: posiblesMaterias,
          };
        }
        return {
          active: false,
          inscripta: false,
          message: "No hay una sexta materia a inscribir",
        };
      }else {
        return {
          active: false,
          inscripta: false,
          message: "Para poder solicitar una sexta materias debes tener inscripta 5 materias",
        };
      }
    }

    return {
      active: false,
      inscripta: false,
      message:
        "Para solicitar la sexta materias debes tener una asesoria activa",
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

export const filterSubjectTutoriadaSuficiencia = createSelector(
  [solicitudOthers, solicitudes, subjectsApprovateTake],
  function (other, sextasMaterias, possibleSubject) {
    const valueOther = map(other, 'codmate')
    const sextaSubject = map(sextasMaterias, 'codmate')
    const valuesArray = valueOther.concat(sextaSubject);

    return possibleSubject.filter(function(item) {
      return !valuesArray.includes(item.code)
    });
  }
);
