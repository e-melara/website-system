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
  TabContent,
} from "reactstrap";

import "./index.scss";

import AsesoriaPage from "./Asesoria";
import { Layout } from "../../components/layouts";
import TablePensum from "./components/TablePensum";
import { checking } from "../../redux/ducks/asesoria";

function PensumPage({ carrera, pensum, loading, verificated }) {
  const [activeTab, seTactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) seTactiveTab(tab);
  };

  useEffect(() => {
    if (!loading) {
      verificated(loading);
    }
  }, [verificated, loading]);

  return (
    <Layout>
      <Row className="second-chart-list third-news-update tabs p-0">
        <Row>
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
              <Row>
                <Col>
                  <TablePensum pensum={pensum} carrera={carrera} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <AsesoriaPage />
            </TabPane>
          </TabContent>
        </Row>
      </Row>
    </Layout>
  );
}

const mapDispathToProps = (dispatch) => {
  return {
    verificated: () => dispatch(checking()),
  };
};

const mapStateToProps = (state) => {
  const { pensum, loading } = state.asesoria;
  return {
    carrera: state.auth.carrera,
    pensum,
    loading,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(PensumPage);
