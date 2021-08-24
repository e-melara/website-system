import React from "react";

import EstadoSextaMateria from "./EstadoSextaMateria";

const SextaMateriaInscripta = ({ validated }) => {
  const [subjects] = validated.subjects;

  return (
    <>
      <table className="table table-striped ">
        <tbody>
          <tr>
            <td colSpan="2" className="texte-center">
              Carnet: <strong>{subjects.carnet}</strong>{" "}
            </td>
            <td className="text-center">
              Estado: <EstadoSextaMateria estado={subjects.estado} />
            </td>
          </tr>
          <tr>
            <td colSpan="3" className="text-center">
              <h4>{subjects.nommate}</h4>
            </td>
          </tr>
          <tr>
            <td className="text-center">
              <strong>Dias</strong>
            </td>
            <td className="text-center">
              <strong>Horas</strong>
            </td>
            <td className="text-center">
              <strong>Turno</strong>
            </td>
          </tr>
          <tr>
            <td className="text-center">{subjects.carga.dias}</td>
            <td className="text-center">{subjects.carga.hora}</td>
            <td className="text-center">{subjects.carga.turno}</td>
          </tr>
        </tbody>
      </table>
      <div className="alert alert-info m-0 text-center">
        <h5>
          Observacion: <span>{subjects.observacion}</span>
        </h5>
      </div>
    </>
  );
};

export default SextaMateriaInscripta;
