import React from "react";
import { Table, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { Column } = Table;

export default function TableSchulesEnrolled({ items, handler }) {
  const data = items.map(({ subject, schules }) => {
    return {
      dia: schules.dias,
      turno: schules.turno,
      horas: schules.hora,
      nommate: subject.nommate,
      materia: subject.materia,
    };
  });

  return (
    <Table bordered dataSource={data} size="small" pagination={false}>
      <Column title="Codigo" dataIndex="materia" key="Dia" />
      <Column title="Materia" dataIndex="nommate" key="nommate" />
      <Column title="Dia" dataIndex="dia" key="dia" />
      <Column title="Horas" dataIndex="horas" key="horas" />
      <Column title="Turno" dataIndex="turno" key="turno" />
      <Column
        width="80px"
        key='nommate'
        render={(_, record) => (
          <Button
            danger
            type="primary"
            onClick={() => handler(record)}
            size="middle"
            icon={<MinusCircleOutlined />}
          >
            Eliminar
          </Button>
        )}
      />
    </Table>
  );
};

