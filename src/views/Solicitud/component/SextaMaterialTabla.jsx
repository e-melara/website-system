import React, { memo } from "react";

const SextaMaterialTabla = memo(({ validated, selectionSubject }) => {
  return (
    <>
      <div className="alert alert-primary text-center">
        <h4>Adiccion de una sexta materia incurre en una costo adicional</h4>
      </div>
      {!validated.inscripta}
      <table className="table">
        {validated.subjects.map(function (item, index) {
          return (
            <React.Fragment key={`validate-subjects-${index}`}>
              <thead>
                <tr>
                  <th>Codigo: {item.materia}</th>
                  <th className="text-center" colSpan="2">
                    <strong>{item.nommate}</strong>
                  </th>
                  <th className="text-right">Ciclo: {item.ciclopens}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Dias</strong>
                  </td>
                  <td>
                    <strong>Hora</strong>
                  </td>
                  <td className="text-center">
                    <strong>Turno</strong>
                  </td>
                  <td></td>
                </tr>
                {item.schules.map(function (element, index) {
                  return (
                    <tr key={index}>
                      <td>{element.dias}</td>
                      <td>{element.hora}</td>
                      <td className="text-center">{element.turno}</td>
                      <td>
                        <button
                          onClick={() => selectionSubject(element, item)}
                          className="btn btn-primary btn-sm"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </React.Fragment>
          );
        })}
      </table>
    </>
  );
});

export default SextaMaterialTabla;
