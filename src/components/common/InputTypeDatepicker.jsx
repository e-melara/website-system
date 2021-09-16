import React from 'react'

import { DatePicker, Col, Form } from "antd";

export const InputTypeDatepicker = ({
  column, input, item
}) => {
  return (
    <Col {...column}>
      <Form.Item {...item} hasFeedback>
        <DatePicker {...input} className='input-width' />
      </Form.Item>
    </Col>
  )
}
