import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";

import { CardUser } from "./component/CardUser";
import { Layout } from "../../components/layouts";
import CardSubjects  from "./component/CardSubjects";

// components comunes
import PageTitle from "../../components/common/PageTitle";
import { startLoadingAsesoria } from "../../redux/asesoria";

const AsesoriaPage = ({ data, carrera, dispatch }) => {
  const urls = ["Asesoria"];
  useEffect(() => {
    dispatch(startLoadingAsesoria())
  }, [dispatch])

  return (
    <Layout>
      <Container fluid={true}>
        <PageTitle title="Asesoria" urls={urls} />
      </Container>
      <Container fluid={true}>
        <Row className="second-chart-list third-news-update">
          <CardUser user={data} carrera={carrera} />
          <CardSubjects />
        </Row>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const {data, carrera} = state.auth;
  return {
    data, carrera
  }
}

export default connect(mapStateToProps)(AsesoriaPage);