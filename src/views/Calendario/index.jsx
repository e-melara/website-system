import React from "react";
import { DatePicker, Row, Col, List } from "antd";

import CardCalendario from "./components/CardCalendario";

const { Item } = List;

const Calendario = () => {
  const arrayData = Array(10).fill(1);
  return (
    <div className="p-4">
      <Row justify="space-between">
        <Col>
          <h3 className="ant-page-header-heading-title">
            Calendario Academico
            <span className="ant-page-header-heading-sub-title">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </span>
          </h3>
        </Col>
        <Col>
          <DatePicker
            size="large"
            picker="month"
            format={"MMMM-YYYY"}
            style={{ width: 210 }}
            placeholder="Seleccione el mes"
          />
        </Col>
      </Row>
      <List
        grid={{
          gutter: [16, 16],
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        style={{ paddingTop: 40 }}
        dataSource={arrayData}
        renderItem={() => (
          <Item>
            <CardCalendario />
          </Item>
        )}
      />
    </div>
  );
};

export default Calendario;
