import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";

import { verificated } from "../../../../utils/verificatedAdvisory";
import { selectionSubjectSchules } from "../../../../redux/ducks/asesoria";

function ItemSchules({ turno, hora, dias, codcarga, selection }) {
  const onClickTap = () => {
    selection({
      turno,
      hora,
      dias,
      codcarga,
    });
  };
  return (
    <tr>
      <td className="text-center">{dias}</td>
      <td className="text-center">{hora}</td>
      <td className="text-center">{turno}</td>
      <th scope="row" className="text-center">
        <Button type="button" color="primary" size="sm" onClick={onClickTap}>
          +
        </Button>
      </th>
    </tr>
  );
}

export const TableSchules = ({ subject }) => {
  const dispatch = useDispatch();
  const { schulesStudents } = useSelector((state) => state.asesoria);

  const { ciclopens, nommate, schules, materia } = subject;
  const handlerSelectionSubject = (schules) => {
    const resolve = verificated(schulesStudents, schules);
    if (resolve.verificated) {
      dispatch(
        selectionSubjectSchules({
          schules,
          subject: {
            materia,
            nommate,
          },
        })
      );
    } else {
      const { message } = resolve;
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const itemSchules = schules.map((item, index) => {
    return (
      <ItemSchules
        selection={handlerSelectionSubject}
        key={`${index}-schules-items`}
        {...item}
      />
    );
  });

  return (
    <Table responsive className="table-border">
      <thead>
        <tr>
          <th colSpan="3">
            <h5 className="text-center">{nommate}</h5>
          </th>
          <th width="150px" className="text-center">
            <h5>Ciclo: {ciclopens}</h5>
          </th>
        </tr>
        <tr>
          <th className="text-center">Dia</th>
          <th className="text-center">Horas</th>
          <th className="text-center">Grupo</th>
          <th width="10px"></th>
        </tr>
      </thead>
      <tbody>{itemSchules}</tbody>
    </Table>
  );
};
