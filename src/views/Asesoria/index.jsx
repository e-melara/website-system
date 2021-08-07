import React from "react";
import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { CardUser } from "./component/CardUser";
import { Layout } from "../../components/layouts";
import { CardSubjects } from "./component/CardSubjects";

// components comunes
import PageTitle from "../../components/common/PageTitle";

// actios
import { loaderSubjectsAsesoria } from "../../redux/asesoria";

// TODO: Buscar la manera de usar menos useSelector
export const AsesoriaPage = () => {
  const urls = ["Asesoria"];

  const dispatch = useDispatch();
  const {data, carrera} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loaderSubjectsAsesoria());
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
