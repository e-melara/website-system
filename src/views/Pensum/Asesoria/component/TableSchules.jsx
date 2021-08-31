import React from "react";

import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
export const TableSchules = ({ subject, handler }) => {
  const { nommate, schules, materia } = subject;
  return (
    <Table size='small' dataSource={schules} pagination={false} bordered key={nommate}>
      <ColumnGroup title={nommate} key={`${nommate}-${Math.ceil(Math.random() * Date.now() )}`}>
        <Column title="Dia" dataIndex="dias" key="Dia" />
        <Column title="Hora" dataIndex="hora" key="hora" />
        <Column title="Grupo" dataIndex="turno" key="turno" />
        <Column
          width="80px"
          key={nommate}
          render={(record) => (
            <Button
              type="primary"
              onClick={() => handler({ subject: { nommate, materia }, schules: record })}
              size="middle"
              icon={<PlusOutlined />}
            >
              Agregar
            </Button>
          )}
        />
      </ColumnGroup>
    </Table>
  );
};

export default TableSchules;
