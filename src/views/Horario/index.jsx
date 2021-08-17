import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Row, CardBody, Col, Card } from "reactstrap";

import { Layout } from "../../components/layouts";
import TablaHorario from "./components/TableHorario";
import { notesLoading } from "../../redux/ducks/notes";
import CardUser from "../../components/common/CardUser";

const HorarioPage = ({ schules, user, carrera, loading, requestLoading }) => {
  useEffect(() => {
    if (!loading) {
      requestLoading();
    }
  }, [loading, requestLoading]);

  return (
    <Layout>
      <Row className="asesoria third-news-update">
        <CardUser user={user} carrera={carrera} />
        {schules.length > 0 ? (
          <TablaHorario items={schules} />
        ) : (
          <Col>
            <Card>
              <CardBody>
                <div className="alert alert-info">
                  <h2 className="text-center">
                    Por el momento no tienes horario asignado
                  </h2>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const { schules, loading } = state.notes;
  const { data, carrera } = state.auth;
  return {
    schules,
    user: data,
    carrera,
    loading,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    requestLoading: () => dispatch(notesLoading()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(HorarioPage);
