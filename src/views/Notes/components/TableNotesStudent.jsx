import React from "react";
import classNames from "classnames";
import { Table, Card, CardHeader, Col, CardBody } from "reactstrap";

const TableNotesStudent = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <Col>
        <Card>
          <CardBody>
            <h1 className="text-center alert alert-info">
              Por el momento no tiene historial de estudio
            </h1>
          </CardBody>
        </Card>
      </Col>
    );
  }

  const mapTableRow = notes.map((element, index) => {
    const clssNames = classNames({
      badge: true,
      "rounded-pill": true,
      "pill-badge-success": element.estado === "APROBADO",
      "pill-badge-secondary": element.estado !== "APROBADO",
    });
    return (
      <tr key={index}>
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{element.ciclopens}</td>
        <td className="text-left">{element.nommate}</td>
        <td className="text-center">{element.codmate}</td>
        <td className="text-center">
          {parseFloat(element.promedio).toFixed(2)}
        </td>
        <td className="text-center">
          <span className={clssNames}>{element.estado}</span>
        </td>
      </tr>
    );
  });

  return (
    <Col>
      <Card>
        <CardHeader style={{ padding: "25px 20px" }}>
          <h3>Historial de notas</h3>
        </CardHeader>
        <Table responsive>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Ciclo</th>
              <th className="text-left">Nombre</th>
              <th className="text-center">Codigo Materia</th>
              <th className="text-center">Nota</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>{mapTableRow}</tbody>
        </Table>
      </Card>
    </Col>
  );
};

export default TableNotesStudent;
