import { values, map, includes, groupBy, orderBy } from "lodash";
const stringStatus = (status) => {
  switch (status) {
    case "V":
      return "Validar";
    case "F":
      return "Facturar";
    case "I":
      return "Inscriptas";
    default:
      return "Activa";
  }
};

export const mapSubjectsActive = (materias) => {
  return values(materias).map((e) =>
    Object.assign({}, e, {
      visible: true,
    })
  );
};

export const forEachPensumArrayToProps = (
  pensum,
  approveds,
  takes,
  enrolled,
  reprobadas
) => {
  let enrolledIs = false;
  let arrayEnrolleds = [];
  const { schules } = enrolled;
  const pensumValues = values(pensum);
  const approvedsValues = map(values(approveds), "materia");
  const takesValues = map(values(takes), "materia");
  const reprobadasValues = map(values(reprobadas), "materia");

  if (schules && schules.length > 0) {
    enrolledIs = true;
    arrayEnrolleds = map(schules, "codmate");
  }

  const pensumEvaluado = pensumValues.map((e) =>
    Object.assign({}, e, {
      take: includes(takesValues, e.codmate),
      approved: includes(approvedsValues, e.codmate),
      enrolled: enrolledIs && includes(arrayEnrolleds, e.codmate),
      reprobada: includes(reprobadasValues, e.codmate),
    })
  );

  return orderBy(groupBy(pensumEvaluado, 'ciclopens'), 'nopensim')
};

export const propsToEnrolled = (data) => {
  let { enrolled, schules } = data;
  return Object.assign({}, enrolled, {
    schules,
    estado: stringStatus(enrolled.estado),
  });
};
