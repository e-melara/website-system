import { filter } from "lodash";
import { connect } from "react-redux";
import React, { useState } from "react";

import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Card, Button, message } from "antd";

import TableSchules from "./TableSchules";
import ModalAsesoria from "./ModalAsesoria";
import TableSchulesEnrolled from "./TableSchulesEnrollled";

import {
  deleteSchulesSubject,
  selectionSubjectSchules,
} from "../../../../redux/ducks/asesoria";
import { verificatedSubject } from "../../../../utils/verificatedAdvisory";

function CardSubjects({ subjects, schulesStudents, title, add, drop }) {
  const [isOpen, setisOpen] = useState(false);

  const handlerAddSubjectStatus = (record) => {
    const { verificated, txt } = verificatedSubject(
      schulesStudents,
      record.schules
    );
    if (verificated) {
      add(record);
    } else {
      message.error(txt, 5);
    }
  };

  const handlerDeleteSubject = (record) => {
    drop(record);
  };

  const itemSubject = filter(subjects, { visible: true }).map((e, key) => {
    return (
      <TableSchules
        handler={handlerAddSubjectStatus}
        key={`${key}-stable-subject`}
        subject={e}
      />
    );
  });

  return (
    <>
      <Row gutter={[24, 8]}>
        {itemSubject.length > 0 && (
          <Col flex={3}>
            <Card title="Materias del ciclo 02-2021">{itemSubject}</Card>
          </Col>
        )}
        {schulesStudents.length > 0 && (
          <Col flex={3}>
            <Card
              title={title ? title : "Hoja de asesoria"}
              extra={
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setisOpen(true)}
                  icon={<SendOutlined />}
                >
                  Enviar
                </Button>
              }
            >
              <TableSchulesEnrolled
                key={schulesStudents}
                items={schulesStudents}
                handler={handlerDeleteSubject}
              />
            </Card>
          </Col>
        )}
      </Row>
      <ModalAsesoria isOpen={isOpen} handler={setisOpen} />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    drop: (data) => dispatch(deleteSchulesSubject(data)),
    add: (data) => dispatch(selectionSubjectSchules(data)),
  };
};

const mapStateToProps = (state) => {
  const { asesoria } = state;
  return {
    subjects: asesoria.subjects,
    schulesStudents: asesoria.schulesStudents,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSubjects);
