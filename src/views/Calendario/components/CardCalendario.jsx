import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

import "./card_calendario.scss";

const CardCalendario = () => {
  return (
    <Col xs={3}>
      <Card className="card___calendario">
        <CardHeader>
          <span>23</span>
          <span>Ago</span>
        </CardHeader>
        <CardBody>
          <a href="#/">
            Inicia recepción de Estudio Socioeconómico Ciclo 01-2022.
          </a>
          <span id="fecha__calendario">Desde 23 Ago hasta el 27 Ago</span>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardCalendario;
