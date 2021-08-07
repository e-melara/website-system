import React from "react";
import { Table, Input } from "reactstrap";

function ItemSchules({ turno, hora, dias }) {
  return (
    <tr>
      <th scope="row" className="text-center">
        <Input type="radio" name="subject" />
      </th>
      <td className="text-center">{dias}</td>
      <td className="text-center">{hora}</td>
      <td className="text-center">{turno}</td>
    </tr>
  );
}

export const TableSchules = ({ subject }) => {
  const {ciclopens, nommate, schules} = subject;
  return (
    <Table responsive className="table-border">
      <thead>
        <tr>
          <th colSpan="3">
            <h5 className="text-center">{nommate}</h5>
          </th>
          <th>
            <h5>Ciclo: {ciclopens}</h5>
          </th>
        </tr>
        <tr>
          <th width="10px"></th>
          <th className="text-center">Dia</th>
          <th className="text-center">Horas</th>
          <th className="text-center">Grupo</th>
        </tr>
      </thead>
      <tbody>
        {schules.map((item, index) => {
          return <ItemSchules key={`${index}-schules-items`} {...item} />;
        })}
      </tbody>
    </Table>
  );
};
