import React from "react";
import { useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";

import { deleteSchulesSubject } from "../../../redux/ducks/asesoria";

const TableSchulesEnrollledItem = ({ schules, subject, index }) => {
  const dispatch = useDispatch();

  const handleDeleteSubjectEnrolled = () => {
    dispatch(deleteSchulesSubject(subject));
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{subject.nommate}</td>
      <td className="text-center">{schules.dias}</td>
      <td className="text-center">{schules.hora}</td>
      <td className="text-center">{schules.turno}</td>
      <td>
        <Button
          onClick={handleDeleteSubjectEnrolled}
          close
          className="btn btn-danger"
        ></Button>
      </td>
    </tr>
  );
};

export default function TableSchulesEnrolled({ items }) {
  const rows = items.map(function (element, index) {
    return (
      <TableSchulesEnrollledItem
        key={element.subject.materia}
        {...element}
        index={index}
      />
    );
  });

  return (
    <Table responsive className="table-border">
      <thead>
        <tr>
          <th>#</th>
          <th className="text-center">Materia</th>
          <th className="text-center">Dia</th>
          <th className="text-center">Horas</th>
          <th className="text-center">Grupo</th>
          <th width="10px"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
