import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import {
  Col,
  Card,
  CardHeader,
} from "reactstrap";

import { TableSchules } from "./TableSchules";

export function CardSubjects() {
  const { subjects } = useSelector((state) => state.asesoria);

  return (
    <>
      <Col className="dashboard-sec box-col-12">
        <Card className="earning-card">
          <CardHeader style={{ padding: "20px 40px" }}>
            <div className="header-top">
              <h5 className="m-0">Materias</h5>
            </div>
          </CardHeader>
          { !isEmpty(subjects) &&
            subjects.map((item, index) => {
              return <TableSchules key={`TableSchules-${index}`} subject={item} />
            })
          }
        </Card>
      </Col>
    </>
  );
}
