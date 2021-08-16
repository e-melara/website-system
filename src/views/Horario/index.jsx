import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";

import { Layout } from "../../components/layouts";
import PageTitle from "../../components/common/PageTitle";
import { CardUser } from "../Pensum/Asesoria/component/CardUser";
import CardSubjects from "../Pensum/Asesoria/component/CardSubjects";
import CardUserEnrolled from "../Pensum/Asesoria/component/CardUserEnrolled";

const HorarioPage = ({ data, carrera, active, enrolled }) => {
  return (
    <Layout>
      <Container fluid={true}>
        <Row>
          <PageTitle title="Horario del ciclo" />
        </Row>
        <Row className="asesoria third-news-update">
          <CardUser user={data} carrera={carrera} />
          {!active && <CardSubjects />}
          {active && <CardUserEnrolled enrolled={enrolled} />}
        </Row>
      </Container>
    </Layout>
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

export default connect(mapStateToProps)(HorarioPage);
