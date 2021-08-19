import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import "../admin.scss";
import HomePage from "./Home";
import { Layout } from "../../../components/layouts";
import ProfileStudent from "./component/ProfileStudent";
import ListNavStudents from "./component/ListNavStudents";

const AsesoriaAdmin = () => {
  const { path } = useRouteMatch();

  return (
    <Layout classBodyOther={{ "page-body-admin-asesoria": true }}>
      <div className="email-wrap bookmark-wrap">
        <div className="email-right-aside bookmark-tabcontent contacts-tabs">
          <Card className="email-body radius-left">
            <CardHeader className="d-flex justify-content-between">
              <h5>Asesoria</h5>
            </CardHeader>
            <CardBody className="p-0">
              <Row className="list-person">
                <Col xl={3} md={4}>
                  <ListNavStudents />
                </Col>
                <Col xl={9} md={8}>
                  <Switch>
                    <Route
                      path={`${path}/:student`}
                      component={ProfileStudent}
                    />
                    <Route exact path={path} component={HomePage} />
                  </Switch>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AsesoriaAdmin;
