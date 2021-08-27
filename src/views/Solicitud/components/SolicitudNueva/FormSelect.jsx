import React, { useState } from "react";
import { Form, Select, Input } from "antd";

import { Col, Row } from "reactstrap";

const { Option } = Select;
const { TextArea } = Input;

const FormSelect = ({ form, subjects, validated, data }) => {
  const { active, inscripta } = validated;
  const { observacion, type, subject } = data;
  const [showFormSubject, setShowFormSubject] = useState("SEXTA");

  const onChangeValuesInput = (e) => {
    if (e.type) {
      setShowFormSubject(e.type);
    }
  };

  return (
    <div className="form-select-subject">
      <div className="title-component">
        <h2>Lorem Ipsum</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        {!active && (
          <div className="alert alert-primary">
            <p className="text-center">{validated.message}</p>
          </div>
        )}
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type,
          subject,
          observacion,
        }}
        labelCol={{ span: 24 }}
        className="form-wrapper"
        wrapperCol={{ span: 24 }}
        onValuesChange={onChangeValuesInput}
      >
        <Row>
          <Col>
            <Form.Item
              name="type"
              label="Tipo de solicitud"
              rules={[
                {
                  required: true,
                  message: "El tipo de la solicitud es requerido",
                },
              ]}
            >
              <Select
                name="type"
                id="type"
                size="large"
                className="form-control"
                placeholder="Seleccione el tipo de solicitud"
              >
                <Option>[Seleccione una opcion]</Option>
                {active && !inscripta && <Option value={"SEXTA"}>Sexta Materia</Option>}
                <Option value={"TUTORIADA"}>Materia Tutoriada</Option>
                <Option value={"SUFICIENCIA"}>Examen de Suficiencia</Option>
              </Select>
            </Form.Item>
          </Col>
          {showFormSubject !== "SEXTA" && (
            <Col>
              <Form.Item
                name="subject"
                label="Materia a solicitar"
                rules={[
                  {
                    required: !(showFormSubject === "SEXTA"),
                    message: "La materia a solicitar es requerido",
                  },
                ]}
              >
                <Select
                  name="subject"
                  id="subject"
                  size="large"
                  disabled={showFormSubject === "SEXTA"}
                  className="form-control"
                  placeholder="Seleccione el tipo de solicitud"
                >
                  <Option>[Seleccione una opcion]</Option>
                  {subjects.map((item, index) => (
                    <Option key={`${item.code}-${index}`} value={item.code}>
                      {item.object.nommate}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Form.Item
          name="observacion"
          label="Motivos por que realiza la solicitud"
          rules={[
            {
              required: true,
              message:
                "Se necesita saber los motivos por los cuales es solicitada la materia",
            },
          ]}
        >
          <TextArea className="form-control" size="large" rows={4} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormSelect;
