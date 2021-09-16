import React from "react";
import { Select, Col, Form } from 'antd'

export const SelectInputType = ({ column, item, options, events }) => {
  return (
    <Col {...column}>
      <Form.Item {...item} hasFeedback>
        <Select placeholder={item.placeholder} {...events}>
          {options &&
            options.map((element) => (
              <Select.Option value={element.value} key={element.value}>
                {element.title}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Col>
  )
}
