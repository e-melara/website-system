import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";

import { Layout } from "../../components/layouts";
import { notesLoading } from "../../redux/ducks/notes";
import PageTitle from "../../components/common/PageTitle";

const HorarioPage = ({ notes: { loading }, requestLoading }) => {
  useEffect(() => {
    if (!loading) {
      requestLoading();
    }
  }, [loading, requestLoading]);

  return (
    <Layout>
      <Container fluid={true}>
        <Row>
          <PageTitle title="Horario del ciclo" />
        </Row>
        <Row className="asesoria third-news-update"></Row>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const notes = state.notes;
  return {
    notes,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    requestLoading: () => dispatch(notesLoading()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(HorarioPage);
