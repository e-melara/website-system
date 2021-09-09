import React from "react";
import { Modal, Button, Spin, Table, Row, Col, Card, Space } from "antd";
import {
  CloseOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import { StatusTagAsesoria } from "../../../components/common/TagEstado";
import CardUser from "../../../components/common/CardUser";

const columns = [
  {
    title: "Codigo",
    dataIndex: "codmate",
    key: "codmate",
    align: "left",
  },
  {
    title: "Nombre de materia",
    dataIndex: "nommate",
    key: "nommate",
  },
  {
    key: "dias",
    title: "Dias",
    dataIndex: "dias",
    align: "center",
  },
  {
    title: "Horas",
    dataIndex: "hora",
    key: "hora",
    align: "center",
  },
  {
    key: "estado",
    title: "Estado",
    dataIndex: "estado",
    align: "center",
    render: (record) => <StatusTagAsesoria status={record} />,
  },
];

const AsesoriaModal = ({
  user,
  data,
  isOpen,
  addSend,
  handlerOpen,
  addSelectedKeys,
}) => {
  const { loading, isSend, id, enrolled, selectedRowsKeyArray } = data;

  return (
    <>
      <Modal
        width="80%"
        visible={isOpen}
        title="Asesoria"
        key={user.carnet}
        footer={[
          <Space wrap className="d-flex justify-content-between">
            <Button
              size="large"
              type="default"
              loading={loading}
              icon={<CloseOutlined />}
              onClick={() => handlerOpen(false)}
            >
              Cancelar
            </Button>
            {!isSend && (
              <Button
                size="large"
                type="primary"
                loading={loading}
                icon={<CheckCircleOutlined />}
                disabled={selectedRowsKeyArray.length === 0}
                onClick={() => addSend("ACEPTADA", selectedRowsKeyArray, id)}
              >
                Enviar
              </Button>
            )}
          </Space>,
        ]}
      >
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spin size="large" tip="Cargando ..." />
          </div>
        ) : (
          <Row gutter={[24, 16]}>
            <Col flex="1">
              <CardUser
                user={{
                  id: user.carnet,
                  nombres: user.nombres,
                  apellidos: user.apellidos,
                }}
                carrera={user.nomcarrera}
              />
            </Col>
            <Col flex="3">
              <Card
                title="Materias solicitadas"
                extra={[
                  <Space wrap>
                    {!isSend && (
                      <Button
                        size="large"
                        type="primary"
                        loading={loading}
                        icon={<WarningOutlined />}
                        onClick={() =>
                          addSend("PENDIENTE", selectedRowsKeyArray, id)
                        }
                        disabled={
                          selectedRowsKeyArray.length === 0 ||
                          selectedRowsKeyArray.length === enrolled.length
                        }
                      >
                        Pendientes
                      </Button>
                    )}
                  </Space>,
                ]}
              >
                <Table
                  bordered
                  size="middle"
                  rowKey={(record) => record.id}
                  columns={columns}
                  pagination={false}
                  dataSource={enrolled}
                  rowSelection={
                    !isSend && {
                      onChange: (selectedKeyRows) => {
                        addSelectedKeys(selectedKeyRows);
                      },
                      fixed: true,
                      hideSelectAll: true,
                      preserveSelectedRowKeys: true,
                      selectedRowKeys: selectedRowsKeyArray,
                    }
                  }
                />
              </Card>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default AsesoriaModal;
