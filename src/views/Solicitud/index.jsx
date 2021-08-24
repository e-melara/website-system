import classnames from "classnames";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Row,
  Nav,
  Col,
  TabPane,
  NavItem,
  NavLink,
  TabContent,
  Container,
} from "reactstrap";

import { Layout } from "../../components/layouts";
import SextaMateria from "./component/SextaMateria";
import { checking } from "../../redux/ducks/asesoria";
import MateriaTutoriada from "./component/MateriaTutoriada";
import ExamenSuficiencia from "./component/ExamenSuficiencia";

// selectores
import {
  solicitudOthers,
  subjectsApprovateTake,
  validateSextaSubject,
} from "../../redux/selectors/asesoria";

function SolicitudPage({
  loading,
  results,
  verificated,
  validated,
  solicitudes,
}) {
  useEffect(() => {
    verificated(loading);
  }, [loading, verificated]);

  const [activeTab, seTactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) seTactiveTab(tab);
  };
  return (
    <Layout classBodyOther={{ "page-margin-left": true }}>
      <Row className="second-chart-list third-news-update tabs p-0">
        <Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => toggle("1")}
              >
                Sexta Materia
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => toggle("2")}
              >
                Materia Tutoriada
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => toggle("3")}
              >
                Examen de suficiencia
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Container fluid={true}>
                <Row className="justify-content-center">
                  <Col md={10} lg={8} xs={12}>
                    {validated.active && <SextaMateria validated={validated} />}
                    {!validated.active && !validated.inscripta && (
                      <div className="alert alert-danger">
                        <p>{validated.message}</p>
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>
            </TabPane>
            <TabPane tabId="2">
              <Row className="justify-content-center">
                <MateriaTutoriada />
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row className="justify-content-center">
                <ExamenSuficiencia />
              </Row>
            </TabPane>
          </TabContent>
        </Row>
      </Row>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  const { loading } = state.asesoria;

  return {
    loading,
    solicitudes: solicitudOthers(state),
    results: subjectsApprovateTake(state),
    validated: validateSextaSubject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verificated: (loading) => dispatch(checking(loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolicitudPage);
