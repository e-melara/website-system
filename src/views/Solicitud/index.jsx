import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Button, Table, Card, Alert } from "antd";

// Moment
import "moment/locale/es";
import Moment from "react-moment";

import { Layout } from "../../components/layouts";
import { paginator } from "../../redux/ducks/solicitud";

const statusText = (message) => {
  return message === "I"
    ? "Iniciada"
    : message === "A"
    ? "Aceptada"
    : "Denegada";
};

function Solicitud({ paginatorHandler, paginator }) {
  useEffect(() => {
    paginatorHandler(1);
  }, [paginatorHandler]);

  const handlerChangePage = (pagination) => {
    const { current } = pagination;
    paginatorHandler(current);
  };

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codmate",
    },
    {
      title: "Materia",
      dataIndex: "nommate",
    },
    {
      width: "80px",
      title: "Tipo",
      dataIndex: "type",
      render: (type) => (
        <Alert
          type={
            type === "SUFICIENCIA"
              ? "success"
              : type === "EXAMEN"
              ? "info"
              : "warning"
          }
          message={type}
        />
      ),
    },
    {
      width: "80px",
      title: "Estado",
      dataIndex: "estado",
      render: (status) => (
        <Alert
          message={statusText(status)}
          type={status === "I" ? "info" : status === "A" ? "success" : "error"}
        />
      ),
    },
    {
      title: "Fecha",
      width: "160px",
      dataIndex: "created_at",
      render: (dateCreated) => (
        <Moment date={dateCreated} format="DD MMM YYYY" withTitle locale="es" />
      ),
    },
    {
      title: "Hace",
      width: "160px",
      dataIndex: "created_at",
      render: (dateCreated) => (
        <Moment date={dateCreated} toNow locale="es" />
      ),
    },
  ];

  return (
    <Layout>
      <Row justify="end" className="p-4">
        <Col span={3}>
          <Link to="/solicitud/s/new">
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
      <Row>
        <Col span={24}>
          <Card title="Solicitudes">
            <Table
              bordered
              columns={columns}
              onChange={handlerChangePage}
              dataSource={paginator.data}
              loading={paginator.loading}
              pagination={paginator.pagination}
              rowKey={(record) => `${record.codmate}-${record.id}`}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

const mapDispatchToProps = (dispath) => {
  return {
    paginatorHandler: (data) => dispath(paginator(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    paginator: state.solicitud.list,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Solicitud);
