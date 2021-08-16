import React from "react";
import { Col } from "reactstrap";

import "./ItemTablePensum.scss";
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
        approved: approved,
        take: take,
        enrolled: enrolled,
        reprobada: reprobada,
      })} item-subject row align-items-center`}
    >
      <Col xs={3} className="brd-bottom brd-right">
        <strong>{nopensum}</strong>
      </Col>
      <Col xs={9} className="brd-bottom">
        {codmate}
      </Col>
      <Col xs={12}>
        <strong className="item-nommate">{nommate}</strong>
      </Col>
      <Col className="brd-top brd-right">{codprere}</Col>
      <Col className="brd-top">{univalora}</Col>
    </div>
  );
};
