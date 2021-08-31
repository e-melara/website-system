import React from "react";
// import { Card, CardBody, CardHeader, Col } from "reactstrap";

import { Card } from "antd";

import "./card_calendario.scss";

const CardCalendario = () => {
  return (
    <Card title={"23"} extra={<span>Agosto</span>} hoverable>
      <a className="link" href="#/">
        Inicia recepción de Estudio Socioeconómico Ciclo 01-2022.
      </a>
      <span className="date_span">Desde 23 Ago hasta el 27 Ago</span>
    </Card>
  );
};

export default CardCalendario;
