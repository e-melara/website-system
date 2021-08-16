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

  console.log(reprobadasValues);
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

  let subjectsGroupBy = groupBy(pensumEvaluado, "ciclopens");
  return orderArrayBidimensional(subjectsGroupBy);
};

const orderArrayBidimensional = (array) => {
  const numCiclo = 10 / 2;
  let arrayResponse = [];
  const orderSubject = orderBy(array, "nopensum");

  for (let index = 0; index < numCiclo; index++) {
    arrayResponse.push([
      orderSubject[0][index],
      orderSubject[1][index],
      orderSubject[2][index],
      orderSubject[3][index],
      orderSubject[4][index],
      orderSubject[5][index],
      orderSubject[6][index],
      orderSubject[7][index],
      orderSubject[8][index],
      orderSubject[9][index],
    ]);
  }
  return arrayResponse;
};

export const propsToEnrolled = (data) => {
  let { enrolled, schules } = data;
  return Object.assign({}, enrolled, {
    schules,
    estado: stringStatus(enrolled.estado),
  });
};
