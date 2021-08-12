import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

import { ItemTablePensum } from "./ItemTablePensum";

function TablePensum({ pensum }) {
  const ciclos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const rows = pensum.map((e, index) => {
    return (
      <tr key={`pensum-table-${index}`}>
        {e.map((item) => {
          if (item) {
            return (
              <td key={`${item.codmate}-${item.nommate}`}>
                <ItemTablePensum {...item} />
              </td>
            );
          }
          return <td key={Math.random() * 1000 + ".item.empty"}></td>;
        })}
      </tr>
    );
  });
  return (
    <Table responsive bordered size="sm">
      <tbody>
        <tr>
          {ciclos.map((ciclo) => (
            <td className="text-center" key={ciclo}>
              <strong> {ciclo}</strong>
            </td>
          ))}
        </tr>
        {rows}
      </tbody>
    </Table>
  );
}

function mapStateToProps(state) {
  return {
    pensum: state.asesoria.pensum,
  };
}

export default connect(mapStateToProps)(TablePensum);
