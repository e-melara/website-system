import React from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

import { Layout } from "../../components/layouts";

function Solicitud() {
  return (
    <Layout>
      <Row justify="end" className="p-4">
        <Col span={3}>
          <Link to='/solicitud/s/new'>
            <Button
              size="large"
              type="primary"
              icon={<PlusCircleOutlined />}
              shape="round"
            >
              Nueva solicitud
            </Button>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
}

export default Solicitud;
