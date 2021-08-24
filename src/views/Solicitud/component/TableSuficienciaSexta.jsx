import React from "react";
import Moment from "react-moment";
import { Card, CardHeader, CardBody, Table, Col } from "reactstrap";

import EstadoSextaMateria from "./EstadoSextaMateria";

const TableSuficienciaSexta = ({ filterTutoriada }) => {
  return (
    <Col>
      <Card className="m-3 no-border">
        <CardHeader className="p-4">
          <h6>Materia Solicitadas</h6>
        </CardHeader>
        <CardBody className="p-4">
          <Table striped>
            <thead>
              <tr>
                <th className="text-left">
                  <strong>Nombre Materia</strong>
                </th>
                <th className="text-center">
                  <strong>Estado</strong>
                </th>
                <th className="text-center">
                  <strong>Fecha</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterTutoriada.map(function (item) {
                return (
                  <tr key={item.created_at}>
                    <td>{item.nommate}</td>
                    <td className="text-center">
                      <EstadoSextaMateria estado={item.estado} />
                    </td>
                    <td className="text-center">
                      <Moment locale="es" format="D MMM YYYY" withTitle>
                        {item.created_at}
                      </Moment>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TableSuficienciaSexta;
