import React from "react";

import { Col, Input, Form } from "antd";

export const InpuType = ({ column, input, item }) => {
  return (
    <Col {...column}>
      <Form.Item {...item} hasFeedback>
        <Input {...input}  />
      </Form.Item>
    </Col>
  );
};
