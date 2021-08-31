import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import "./asesoria.scss";
import CardUser from "../../../components/common/CardUser";
import CardSubjects from "./component/CardSubjects";
import CardUserEnrolled from "./component/CardUserEnrolled";

// TODO:Por el momento no he modificado el modal
const AsesoriaPage = ({ data, carrera, active, enrolled }) => {
  return (
    <Row gutter={[24, 8]} className="asesoria third-news-update">
      <Col flex={2}>
        <CardUser user={data} carrera={carrera} />
      </Col>
      {!active && (
        <Col flex={5}>
          <CardSubjects />
        </Col>
      )}
      {active && (
        <Col flex={5}>
          <CardUserEnrolled enrolled={enrolled} />
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  const { data, carrera } = state.auth;
  const { active, enrolled } = state.asesoria;
  return {
    data,
    carrera,
    active,
    enrolled,
  };
};

export default connect(mapStateToProps)(AsesoriaPage);
