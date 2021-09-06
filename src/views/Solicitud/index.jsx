import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Button, Table, Card, Alert } from "antd";

import "moment/locale/es";
import Moment from "react-moment";

import { paginator, initialStateSolicitud } from "../../redux/ducks/solicitud";

const statusText = (message) => {
  return message === "I"
    ? "Iniciada"
    : message === "A"
    ? "Aceptada"
    : "Denegada";
};

function Solicitud({ paginatorHandler, paginator, initial }) {
  useEffect(() => {
    initial()
  }, [initial]);

  const handlerChangePage = (pagination) => {
    const { current } = pagination;
    paginatorHandler(current);
  };

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codmate",
      align: "center",
    },
    {
      title: "Materia",
      dataIndex: "nommate",
    },
    {
      width: "80px",
      title: "Tipo",
      align: "center",
      dataIndex: "type",
      render: (type) => {
        let alertType = type === "SEXTA" ? "success" : "info";
        if (type === "TUTORIADA") {
          alertType = "warning";
        }
        return (
          <Alert
            type={alertType}
            message={type}
          />
        );
      },
    },
    {
      width: "80px",
      title: "Estado",
      align: "center",
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
      align: "center",
      dataIndex: "created_at",
      render: (dateCreated) => (
        <Moment date={dateCreated} format="DD MMM YYYY" withTitle locale="es" />
      ),
    },
    {
      title: "",
      align: "center",
      width: "160px",
      dataIndex: "created_at",
      render: (dateCreated) => (
        <Moment date={dateCreated} fromNow locale="es" />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row justify="space-between" className="p-4">
        <Col></Col>
        <Col>
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
          <Card title="Solicitudes" size="small" hoverable>
            <Table
              bordered
              size="small"
              rowKey='codmate'
              columns={columns}
              onChange={handlerChangePage}
              dataSource={paginator.data}
              loading={paginator.loading}
              pagination={paginator.pagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapDispatchToProps = (dispath) => {
  return {
    initial: () => dispath(initialStateSolicitud()),
    paginatorHandler: (data) => dispath(paginator(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    paginator: state.solicitud.list,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Solicitud);
