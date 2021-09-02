import React from "react";

import classnames from "classnames";

export const ItemTablePensum = ({
  take,
  nommate,
  codmate,
  approved,
  nopensum,
  codprere,
  univalora,
  enrolled,
  reprobada,
}) => {
  return (
    <div
      className={`${classnames({
        take: take,
        aprobadas: approved,
        inscriptas: enrolled,
        reprobada: reprobada,
        default: !(approved || enrolled || reprobada),
      })} item-subject row align-items-center cuadro`}
    >
      <div className="brd-bottom brd-right col-3">
        <strong>{nopensum}</strong>
      </div>
      <div className="brd-bottom col-9">{codmate}</div>
      <div className="col-12" xs={12}>
        <strong className="item-nommate">{nommate}</strong>
      </div>
      <div className="brd-top brd-right col">{codprere}</div>
      <div className="brd-top col">{univalora}</div>
    </div>
  );
};
