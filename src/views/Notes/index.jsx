import classnames from "classnames";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

import {
  Row,
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Container,
  TabContent,
} from "reactstrap";

import { Layout } from "../../components/layouts";
import { notesLoading } from "../../redux/ducks/notes";

import TableSchulesCiclo from "./components/TableSchulesCiclo";
import TableHistoryNotes from "./components/TableHistoryNotes";

function NotesPages({ loading }) {
  const [activeTab, seTactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) seTactiveTab(tab);
  };

  useEffect(() => {
    loading();
  }, []);

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
                  Horario
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggle("2")}
                >
                  Notas
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <TableSchulesCiclo />
              </TabPane>
              <TabPane tabId="2">
                <TableHistoryNotes />
              </TabPane>
            </TabContent>
          </>
        </Row>
      </Container>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loading: () => dispatch(notesLoading()),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesPages);
