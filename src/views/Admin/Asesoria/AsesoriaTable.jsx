import { Table } from "antd";
import Moment from "react-moment";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { actionsType } from "../../../redux/ducks/admin/asesoria";

const { Column } = Table;

const AsesoriaTable = ({ paginator }) => {
  useEffect(() => {
    paginator();
  }, [paginator]);

  return (
    <div>
      {/* <Table
        rowKey="carnet"
        loading={loading}
        dataSource={data}
        bordered
        size="large"
      >
        <Column
          align="center"
          title="Carnet"
          key="carnet"
          dataIndex="carnet"
          filterIcon={<SearchOutlined />}
          filtered={true}
          fixed="left"
        />
        <Column
          title="Nombre comppleto"
          dataIndex="nombres"
          key="nombres"
          align="left"
          render={(_, record) => {
            return (
              <span>
                {record.nombres} {record.apellidos}
              </span>
            );
          }}
        />
        <Column
          align="center"
          title="Carrera"
          dataIndex="nomcarrera"
          key="nomcarrera"
        />
        <Column
          align="center"
          title="Fecha de creacion"
          dataIndex="created_at"
          key="created_at"
          render={(record) => {
            return <Moment date={record} format="DD/MMMM/YYYY HH:mm" />;
          }}
        ></Column>
      </Table> */}
    </div>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    paginator: (payload) =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_LOADING, payload }),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispathToProps)(AsesoriaTable);
