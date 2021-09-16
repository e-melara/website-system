export const arrayAsesoriaArreglo = (schules = []) => {
  if (!schules) {
    return [];
  }
  return schules.map(({ id, estado, subjects }) => {
    let array = {
      id,
      key: id,
      estadoAsesoria: estado,
      dias: subjects.dias,
      hora: subjects.hora,
      chosen: estado === "A",
      estado: subjects.estado,
      codmate: subjects.codmate,
      nommate: subjects.nommate,
    };

    if (subjects.codprere !== "0") {
      array["children"] = subjects.prerequisito.map(
        ({ codmate, nommate, promedio }) => ({
          nommate,
          codmate,
          dias: "PROMEDIO",
          key: "key-" + codmate,
          hora: parseFloat(promedio).toFixed(2),
        })
      );
    }
    return array;
  });
};

export const selectedRowsKey = (data = []) =>
  data.filter(({ chosen }) => chosen).map(({ key }) => key);
