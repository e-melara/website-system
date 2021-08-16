import classnames from "classnames";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Container,
  TabContent,
  Jumbotron,
  Table,
} from "reactstrap";

import "./index.scss";

import AsesoriaPage from "./Asesoria";
import { Layout } from "../../components/layouts";
import TablePensum from "./components/TablePensum";
import { pensumLoadingAll } from "../../redux/ducks/asesoria";

function PensumPage({ dispatch, carrera, asesoria }) {
  const [activeTab, seTactiveTab] = useState("1");

  useEffect(() => {
    dispatch(pensumLoadingAll());
  }, [dispatch]);

  const toggle = (tab) => {
    if (activeTab !== tab) seTactiveTab(tab);
  };
  return (
    <Layout>
      <Container fluid={true}>
        <Row className="second-chart-list third-news-update tabs">
          <>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => toggle("1")}
                >
                  Pensum
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggle("2")}
                >
                  Asesoria
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Container fluid={true}>
                  <Row>
                    <Col>
                      <Jumbotron>
                        <h1 className="display-3">Pensum</h1>
                        <p className="lead">
                          Carrera: <strong>{carrera.nomcarrera}</strong>
                        </p>
                        <hr className="my-2" />
                        <p className="lead">
                          Nota: Este módulo tiene la finalidad de visualizar el
                          desarrollo de la carrera a lo largo de los diferentes
                          ciclos de estudio.
                        </p>
                        <Table responsive className="table table-border lead">
                          <tbody>
                            <tr>
                              <td className="text-center">Aprobadas</td>
                              <td className="text-center">
                                <div className="cuadro aprobadas"></div>
                              </td>
                              <td className="text-center">Inscriptas</td>
                              <td className="text-center">
                                <div className="cuadro inscriptas"></div>
                              </td>
                              <td className="text-center">
                                Prerequisitos completos
                              </td>
                              <td className="text-center">
                                <div className="cuadro posibles"></div>
                              </td>
                              <td className="text-center">Pendientes</td>
                              <td className="text-center">
                                <div className="cuadro"></div>
                              </td>
                              <td className="text-center">Reprobadas</td>
                              <td className="text-center">
                                <div className="cuadro reprobada"></div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Jumbotron>
                      <TablePensum />
                    </Col>
                  </Row>
                </Container>
              </TabPane>
              <TabPane tabId="2">
                <AsesoriaPage />
              </TabPane>
            </TabContent>
          </>
        </Row>
      </Container>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    asesoria: state.asesoria,
    carrera: state.auth.carrera,
  };
};

export default connect(mapStateToProps)(PensumPage);
