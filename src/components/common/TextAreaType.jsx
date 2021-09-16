import React from "react";
import { Col, Input, Form } from "antd";

const { TextArea } = Input

export const TextAreaType = ({ column, input, item }) => {
  return (
    <Col {...column}>
      <Form.Item {...item} hasFeedback>
        <TextArea {...input} />
      </Form.Item>
    </Col>
  );
};
