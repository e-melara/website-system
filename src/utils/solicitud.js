import { isEqual } from "lodash";

export const validateSextaSubjectUtils = (current, arraySchules = []) => {
  let resolve = {
    validate: false,
    subjectObject: null,
  };

  const { item } = current;
  const { schules } = arraySchules;
  schules.forEach((element) => {
    if (isEqual(element.hora, item.hora) && isEqual(element.dias, item.dias)) {
      resolve = {
        validate: true,
        subjectObject: element,
      };
      return;
    }
  });
  return resolve;
};
