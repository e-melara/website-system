import React from "react";
import { Table, Card, Alert, Badge } from "antd";

// TODO: Cambiar el colo del estado para los siguientes dos estados
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
  ];

  return (
    <Badge.Ribbon
      text={`${estado}`}
      type={estado === "Activa" ? "purple" : "green"}
    >
      <Card title="Hoja de asesoria" hoverable>
        <Table
        rowKey='codmate'
          dataSource={schules}
          columns={columns}
          bordered
          pagination={false}
        />
        <Alert
          type="success"
          title="Obsevacion"
          style={{ padding: 20 }}
          message={`Observacion: ${
            enrolled.observacion || "Su asesoria esta en proceso de validación"
          }`}
        />
      </Card>
    </Badge.Ribbon>
  );
}
