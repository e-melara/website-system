/**
 * Puntos a tomar en cuenta:
 *  -> No mas de 5 materias
 *  -> No se puede repetir las materias en el mismo dia horario y grupo
 */

import { isEqual } from "lodash";

export const verificated = (schules, current) => {
  if (schules.length >= 5) {
    return {
      verificated: false,
      message: "No puede seleccionar mas de 5 materias",
    };
  }

  const resolveFilter = schules.filter(function (element) {
    const { dias, hora, turno } = element.schules;
    return (
      isEqual(hora, current.hora) &&
      isEqual(dias, current.dias) &&
      isEqual(turno, current.turno)
    );
  });

  if (resolveFilter.length > 0) {
    const subject = resolveFilter[0].subject;
    return {
      verificated: false,
      message: `${subject.nommate} tiene el mismo horario de la materia seleccionada`,
    };
  }

  return {
    verificated: true,
  };
};
