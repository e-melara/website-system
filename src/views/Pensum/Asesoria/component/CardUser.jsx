import React from "react";
import { Col, Card, CardBody } from "reactstrap";

import ImageProfile from "../../../../assets/images/profile/3.png";

export const CardUser = ({ user, carrera }) => {
  return (
    <Col xl={3} lg={12} className="xl-50 morning-sec box-col-12">
      <Card className="o-hidden profile-greeting">
        <CardBody className="avatar-showcase">
          <div className="greeting-user text-center avatars">
            <div className="profile-vector avatar">
              <img
                className="img-fluid img-100 rounded-circle"
                src={ImageProfile}
                alt="imgs para el perfil"
              />
            </div>
            <h5
              className="f-w-600"
              style={{
                color: "black",
              }}
            >
              {user.nombres} {user.apellidos} <br />
              Carnet: {user.id}
            </h5>

            <h6>{carrera.nomcarrera}</h6>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
