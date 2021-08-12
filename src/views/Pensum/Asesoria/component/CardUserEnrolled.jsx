import React from "react";

import { Col, Card, CardHeader, CardFooter, Table } from "reactstrap";

import Badge from "../../../../components/common/Badge";

function CardUserEnrolled({ enrolled }) {
  const rows = enrolled.schules.map(function (row, index) {
    const status = row.estado === "D" ? "Pendiente" : "Aceptada";
    return (
      <tr key={`enrolled ${Math.random() * 100}`}>
        <td>{index + 1}</td>
        <td>{row.nommate}</td>
        <td className="text-center">{row.dias}</td>
        <td className="text-center">{row.hora}</td>
        <td className="text-center">{row.turno}</td>
        <td className="text-center">
          <Badge title={status} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Col>
        <Card className="earning-card">
          <CardHeader style={{ padding: "20px 40px" }}>
            <div className="header-top">
              <h5 className="m-0">Hoja de asesoria</h5>
              <div>
                <span>Estado Actual: </span>
                <Badge title={enrolled.estado} />
              </div>
            </div>
          </CardHeader>
          <Table responsive className="table-bordernone">
            <thead>
              <tr>
                <th width="10px">#</th>
                <th className="text-center">Materia</th>
                <th className="text-center">Dia</th>
                <th className="text-center">Horas</th>
                <th className="text-center">Grupo</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <CardFooter style={{ padding: "20px 40px" }}>
            <h4
              className="alert alert-primary text-center"
              style={{ borderRadius: "50px" }}
            >
              {enrolled.observacion ||
                "Su asesoria esta en proceso de validación"}
            </h4>
          </CardFooter>
        </Card>
      </Col>
    </>
  );
}

export default CardUserEnrolled;
