/**
 * Puntos a tomar en cuenta:
 *  -> No mas de 5 materias
 *  -> No se puede repetir las materias en el mismo dia horario y grupo
 */

import { isEqual } from "lodash";

export const verificatedSubject = (schules = [], current) => {
  if (schules.length >= 5) {
    return {
      verificated: false,
      txt: "No puede seleccionar mas de 5 materias",
    };
  }

  for (const item of schules) {
    const { dias, hora } = item.schules;
    if (isEqual(dias, current.dias) && isEqual(hora, current.hora)) {
      return {
        verificated: false,
        txt: `${item.subject.nommate} tiene el mismo horario de la materia seleccionada`,
      };
    }
  }

  return { verificated: true };
};
