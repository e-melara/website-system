import React from "react";
import { Table, Card, Alert, Badge } from "antd";

import { StatusTagAsesoria } from "../../../../components/common/TagEstado";

const objectValues = {
  Activa: "blue",
  Validar: "green",
  Pendiente: "magenta",
  Inscriptas: "purple",
};

const messageAsesoria = {
  Activa: "Se ha enviado la asesoria al proceso de validacion",
  Validar: "La asesoria esta validad, por favor anexar los datos requeridos",
  Pendiente: "Por el momento la asesoria tiene observaciones, estar pendiente por favor",
  Inscriptas: "La asesoria has sido validad y sus materias estas inscriptas",
};

const messageAsesoriaColor = {
  Activa: "info",
  Validar: "warning",
  Pendiente: "error",
  Inscriptas: "success",
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
        <Alert
          title="Obsevacion"
          style={{ padding: 20, fontSize: '1.2rem', textAlign: "center" }}
          type={messageAsesoriaColor[estado]}
          message={enrolled.observacion || messageAsesoria[estado]}
        />
      </Card>
    </Badge.Ribbon>
  );
}
