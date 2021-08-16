import React from "react";

import { Jumbotron, Table } from "reactstrap";

export default function TableHeader({ carrera }) {
  return (
    <Jumbotron>
      <h1 className="display-3">Pensum</h1>
      <p className="lead">
        Carrera: <strong>{carrera.nomcarrera}</strong>
      </p>
      <hr className="my-2" />
      <p className="lead">
        Nota: Este módulo tiene la finalidad de visualizar el desarrollo de la
        carrera a lo largo de los diferentes ciclos de estudio.
      </p>
      <Table responsive className="table table-border lead">
        <tbody>
          <tr>
            <td className="text-center">Aprobadas</td>
            <td className="text-center">
              <div className="cuadro aprobadas"></div>
            </td>
            <td className="text-center">Inscriptas</td>
            <td className="text-center">
              <div className="cuadro inscriptas"></div>
            </td>
            <td className="text-center">Prerequisitos completos</td>
            <td className="text-center">
              <div className="cuadro posibles"></div>
            </td>
            <td className="text-center">Pendientes</td>
            <td className="text-center">
              <div className="cuadro"></div>
            </td>
            <td className="text-center">Reprobadas</td>
            <td className="text-center">
              <div className="cuadro reprobada"></div>
            </td>
          </tr>
        </tbody>
      </Table>
    </Jumbotron>
  );
}
