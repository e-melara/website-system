import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";

import { CardUser } from "./component/CardUser";
import CardSubjects from "./component/CardSubjects";
import CardUserEnrolled from "./component/CardUserEnrolled";

const AsesoriaPage = ({ data, carrera, active, enrolled }) => {
  return (
    <Container fluid={true}>
      <Row className="asesoria third-news-update">
        <CardUser user={data} carrera={carrera} />
        {!active && <CardSubjects />}
        {active && <CardUserEnrolled enrolled={enrolled} />}
      </Row>
    </Container>
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
