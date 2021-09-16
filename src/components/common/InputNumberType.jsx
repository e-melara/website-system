import React from 'react'
import { Col, Form, InputNumber } from "antd";

export const InputNumberType = ({ column, item, input }) => {
  return (
    <Col {...column}>
      <Form.Item {...item} hasFeedback>
        <InputNumber {...input} className='input-width' />
      </Form.Item>
    </Col>
  )
}