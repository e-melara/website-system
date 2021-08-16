import React from "react";
import { Table } from "reactstrap";

import TableHeader from "./TableHeader";
import { ItemTablePensum } from "./ItemTablePensum";

const getZeroHeader = (row) => {
  return row.ciclopens;
};

function RowPensum({ items }) {
  return (
    <td>
      {items &&
        items.map((subject) => (
          <ItemTablePensum
            {...subject}
            key={"item-table-pensum-" + Math.random()}
          />
        ))}
    </td>
  );
}

function TablePensum({ pensum, carrera }) {
  return (
    <React.Fragment>
      <TableHeader carrera={carrera} />
      <Table responsive bordered size="sm">
        <thead>
          <tr>
            {pensum &&
              pensum.map((item) => {
                const header = getZeroHeader(item[0]);
                return (
                  <th key={Math.random()} className="table-head-th">
                    {header}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {pensum &&
              pensum.map((item) => (
                <RowPensum
                  items={item}
                  key={Math.random() * 1000 + "-table-pensum"}
                />
              ))}
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default TablePensum;
