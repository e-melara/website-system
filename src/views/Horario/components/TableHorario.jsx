import React from "react";
import { Col, Table, Card, CardHeader } from "reactstrap";

const TableHorarioItem = ({ index, hora, dias, codmate, nommate }) => {
  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">{codmate}</td>
      <td className="text-left">{nommate}</td>
      <td className="text-center">{dias}</td>
      <td className="text-center">{hora}</td>
    </tr>
  );
};

const TableHorario = ({ items }) => {
  return (
    <Col>
      <Card>
        <CardHeader style={{ padding: "15px" }}>
          <h2>Horario del ciclo 02-2021</h2>
        </CardHeader>
        <Table responsive hover={true} striped>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Codigo materia</th>
              <th className="text-center">Materia</th>
              <th className="text-center">Dias</th>
              <th className="text-center">Hora</th>
            </tr>
          </thead>
          <tbody>
            {items.map(function (element, index) {
              return (
                <TableHorarioItem
                  {...element}
                  key={Math.random()}
                  index={index}
                />
              );
            })}
          </tbody>
        </Table>
      </Card>
    </Col>
  );
};

export default TableHorario;
