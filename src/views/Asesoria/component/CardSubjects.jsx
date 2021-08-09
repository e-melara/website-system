import React from "react";
import { filter } from "lodash";
import { connect } from "react-redux";
import { Col, Card, CardHeader } from "reactstrap";

import { TableSchules } from "./TableSchules";

function CardSubjects({ subjects, dispatch }) {
  const itemSubject = filter(subjects, { visible: true }).map(function (
    e,
    key
  ) {
    return <TableSchules key={`${key}-stable-subject`} subject={e} />;
  });

  return (
    <>
      <Col className="dashboard-sec box-col-12">
        <Card className="earning-card">
          <CardHeader style={{ padding: "20px 40px" }}>
            <div className="header-top">
              <h5 className="m-0">Materias</h5>
            </div>
          </CardHeader>
          {itemSubject}
        </Card>
      </Col>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subjects: state.asesoria.subjects,
  };
};

export default connect(mapStateToProps)(CardSubjects);
