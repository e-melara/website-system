import classnames from "classnames";
import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  TabPane,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";

import { Layout } from "../../components/layouts";

function SolicitudPage() {
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
              <h2>Pagina de inicio</h2>
            </TabPane>
            <TabPane tabId="2">
              <h2>Pagina de entrada</h2>
            </TabPane>
          </TabContent>
        </Row>
      </Row>
    </Layout>
  );
}

export default SolicitudPage;
