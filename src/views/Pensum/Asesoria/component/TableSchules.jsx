import React from "react";

import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
export const TableSchules = ({ subject, handler }) => {
  const { nommate, schules, materia } = subject;
  return (
    <Table
      bordered
      size="small"
      rowKey='codcarga'
      pagination={false}
      dataSource={schules}
      rowClassName="tr-class"
      >
      <ColumnGroup title={nommate}>
        <Column title="Dia"   align='center' dataIndex="dias" key="Dia" />
        <Column title="Hora"  align='center' dataIndex="hora" key="hora" />
        <Column title="Grupo" align='center' dataIndex="turno" key="turno" />
        <Column
          width="80px"
          key={nommate}
          render={(record) => (
            <Button
              type="primary"
              onClick={() =>
                handler({ subject: { nommate, materia }, schules: record })
              }
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
