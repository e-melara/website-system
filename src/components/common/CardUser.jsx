import React from "react";
import { Card } from "antd";

import { BaseAssets } from "../../consts";

export default function CardUser({ user, carrera }) {
  return (
    <Card>
      <figure className="d-flex justify-content-center">
        <img
          src={`${BaseAssets}files/3.png`}
          style={{ height: 150 }}
          className="img-fluid rounded-circle"
          alt="imgs para el perfil"
        />
      </figure>
      <h5 className="text-center">
        {user.nombres} {user.apellidos} <br />
        Carnet: {user.id}
      </h5>
      <h6 className="text-center">{carrera.nomcarrera}</h6>
    </Card>
  );
}
