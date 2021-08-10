import React from "react";
import { filter } from "lodash";
import { connect } from "react-redux";
import { Col, Card, CardHeader, CardFooter, Button } from "reactstrap";

import { TableSchules } from "./TableSchules";
import TableSchulesEnrolled from "./TableSchulesEnrollled";

// TODO: AGREGAR EL CICLO
function CardSubjects({ subjects, schulesStudents }) {
  const itemSubject = filter(subjects, { visible: true }).map((e, key) => {
    return <TableSchules key={`${key}-stable-subject`} subject={e} />;
  });

  return (
    <>
      {itemSubject.length > 0 && (
        <Col className="dashboard-sec box-col-12">
          <Card className="earning-card">
            <CardHeader style={{ padding: "20px 40px" }}>
              <div className="header-top">
                <h5 className="m-0">Materias del ciclo 02-2021</h5>
              </div>
            </CardHeader>
            {itemSubject}
          </Card>
        </Col>
      )}

      {schulesStudents.length > 0 && (
        <Col>
          <Card className="earning-card">
            <CardHeader style={{ padding: "20px 40px" }}>
              <div className="header-top">
                <h5 className="m-0">Hoja de asesoria</h5>
              </div>
            </CardHeader>
            <TableSchulesEnrolled
              items={schulesStudents}
              key={schulesStudents}
            />
            <CardFooter style={{ padding: "20px 40px" }}>
              <Button
                color="primary"
                className="btn-lg"
                style={{ float: "right" }}
              >
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </Col>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { asesoria } = state;
  return {
    subjects: asesoria.subjects,
    schulesStudents: asesoria.schulesStudents,
  };
};

export default connect(mapStateToProps)(CardSubjects);
