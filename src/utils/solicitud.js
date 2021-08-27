import { map } from "lodash";

const filterSubjectSexta = (schules = [], subjects = []) => {
  const arrayValuesSchules = map(schules, "codmate");
  return subjects.filter((item) => {
    return !arrayValuesSchules.includes(item.materia);
  });
};

export const selectionType = (type, schules = [], subjects = []) => {
  switch (type) {
    case "SEXTA":
      return filterSubjectSexta(schules, subjects);
    case "TUTORIA":
      break;
    case "SUFICIENCIA":
      break;
    default:
      break;
  }
};