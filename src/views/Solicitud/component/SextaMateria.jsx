import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Card, CardBody, CardHeader, Container } from "reactstrap";

import { pensumLoadingAll } from "../../../redux/ducks/asesoria";

const SextaMateria = ({ active, loading, asyncLoading }) => {
  return (
    <Container>
      <Row>
        <Card className="m-3">
          <CardHeader>
            <h4>Sexta Materia</h4>
          </CardHeader>
        </Card>
      </Row>
    </Container>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    asyncLoading: () => dispatch(pensumLoadingAll()),
  };
};

const mapStateToProps = (state) => {
  const { active, loading } = state.asesoria;
  return {
    active,
    loading,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(SextaMateria);
