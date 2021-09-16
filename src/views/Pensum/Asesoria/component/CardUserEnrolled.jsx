import React from "react";
import { Link } from "react-router-dom";
import { PaperClipOutlined } from "@ant-design/icons";
import { Table, Card, Alert, Badge, Space, Button } from "antd";

import { StatusTagAsesoria } from "../../../../components/common/TagEstado";

const objectValues = {
  Activa: "blue",
  Validar: "green",
  Pendiente: "magenta",
  Inscriptas: "purple",
};

const messageAsesoria = {
  Activa: "Se ha enviado la asesoria al proceso de validacion",
  Validar: "Su asesoria ha sido validad, puede realizar el pago en ventanilla o por medio de tranferencia electronica dando click al boton de pago",
  Pendiente:
    "Por el momento la asesoria tiene observaciones, estar pendiente por favor",
  Inscriptas: "La asesoria has sido validad y sus materias estas inscriptas",
};

const messageAsesoriaColor = {
  Activa: "info",
  Validar: "warning",
  Pendiente: "error",
  Inscriptas: "success",
};

const AlertValidar = ({ estado }) => {
  return (
    <Alert
      showIcon
      style={{ padding: 20, fontSize: "1.2rem", textAlign: "center" }}
      type="success"
      action={
        <Space wrap size="large">
          <Link to='/asesoria/form'>
            <Button type="dashed" icon={<PaperClipOutlined />} size="middle">
              Pago
            </Button>
          </Link>
        </Space>
      }
      message={messageAsesoria[estado]}
    />
  );
};

export default function CardUserEnrolled({ enrolled }) {
  const { schules, estado } = enrolled;

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codmate",
      key: "codmate",
    },
    {
      title: "Materia",
      dataIndex: "nommate",
      key: "nommate",
    },
    {
      title: "Dias",
      dataIndex: "dias",
      key: "dias",
    },
    {
      title: "Horarios",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "Grupo",
      dataIndex: "turno",
      key: "turno",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (status) => <StatusTagAsesoria status={status} />,
    },
  ];

  return (
    <Badge.Ribbon text={`${estado}`} color={objectValues[estado]}>
      <Card title="Hoja de asesoria">
        <Table
          bordered
          rowKey="codmate"
          columns={columns}
          dataSource={schules}
          pagination={false}
        />
        {estado !== "Validar" ? (
          <Alert
            showIcon
            title="Obsevacion"
            style={{ padding: 20, fontSize: "1.2rem", textAlign: "center" }}
            type={messageAsesoriaColor[estado]}
            message={enrolled.observacion || messageAsesoria[estado]}
          />
        ) : (
          <AlertValidar estado={estado} />
        )}
      </Card>
    </Badge.Ribbon>
  );
}
