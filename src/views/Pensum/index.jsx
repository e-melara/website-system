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
                      <TablePensum pensum={asesoria.pensum} carrera={carrera} />
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
