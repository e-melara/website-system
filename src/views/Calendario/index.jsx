import React from "react";
import { Row } from "reactstrap";

import { Layout } from "../../components/layouts";
import CardCalendario from "./components/CardCalendario";
import PageTitle from "../../components/common/PageTitle";

const Calendario = () => {
  const tarjetas = Array.from(Array(10).fill(1)).map((_, i) => (
    <CardCalendario key={i} />
  ));

  return (
    <Layout>
      <Row>
        <PageTitle title="Calendario Academico" />
      </Row>
      <Row>{tarjetas}</Row>
    </Layout>
  );
};

export default Calendario;
