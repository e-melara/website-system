import Moment from "react-moment";
import { connect } from "react-redux";
import { Table, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";

import AsesoriaModal from "./AsesoriaModal";
import AsesoriaHeader from "./AsesoriaHeader";
import { StatusTag } from "../../../components/common/TagEstado";

import { actionsType } from "../../../redux/ducks/admin/asesoria";

const { Column } = Table;
const AsesoriaTable = ({
  data,
  loading,
  current,
  addType,
  paginator,
  selectOneById,
  emptySelectedCurrent,
  addSelectedKeysHandler,
}) => {
  //! ---  Use state  --------
  const [isOpen, setIsOpen] = useState(false);
  const [selectCurrent, setSelectCurrent] = useState({});
  const [filterObject, setFilterObject] = useState({
    estado: "A",
    search: "",
  });

  //! effects
  useEffect(() => {
    paginator();
  }, [paginator]);

  useEffect(() => {
    paginator({ page: 1, ...filterObject });
  }, [filterObject, paginator]);

  useEffect(() => {
    if (!isOpen) {
      emptySelectedCurrent();
    }
  }, [isOpen, emptySelectedCurrent]);

  //! Handler function
  //!---- Handler open modal -----!
  const handlerOpen = (data) => {
    setSelectCurrent(data);
    selectOneById({ id: data.id });
    setIsOpen(true);
  };

  //! Pagination
  const handlerChange = (record) => {};

  //! Handler filter
  const handlerFilterDropdown = ({ key }) => {
    if (key === "3") {
      setFilterObject({
        estado: "A",
        search: "",
      });
    } else {
      setFilterObject((status) => ({
        ...status,
        estado: key === "2" ? "P" : "A",
      }));
    }
  };

  //! Handler search
  const handlerSearch = (searchTxt) => {
    setFilterObject((status) => ({
      ...status,
      search: searchTxt.trim(),
    }));
  };

  //! Handler send asesoria change status
  const handlerSend = (type, data, id) => {
    setIsOpen(false);
    addType(type, data, id);
  };

  return (
    <>
      <AsesoriaHeader
        handlerSearch={handlerSearch}
        handlerFilterDropdown={handlerFilterDropdown}
      />
      <div className="p-4">
        <Table
          bordered
          size="small"
          rowKey="carnet"
          dataSource={data}
          loading={loading}
          onChange={handlerChange}
          pagination={{ position: ["none", "bottomCenter"] }}
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
          />
          <Column
            align="center"
            title="Estado"
            width="100px"
            key={(record) => `${record.carnet}-${record.nomcarrera}`}
            render={(record) => {
              return <StatusTag key={record.carnet} status={record.estado} />;
            }}
          />
          <Column
            title="Hace"
            align="center"
            dataIndex="created_at"
            key={(record) => `${record.nomcarrera}-${record.carnet}`}
            render={(record) => <Moment date={record} fromNow />}
          />
          <Column
            align="center"
            key="action"
            render={(record) => (
              <Space size="middle">
                <Button
                  type="dashed"
                  icon={<EyeOutlined />}
                  onClick={() => handlerOpen(record)}
                />
              </Space>
            )}
          />
        </Table>
      </div>
      <AsesoriaModal
        data={current}
        isOpen={isOpen}
        user={selectCurrent}
        addSend={handlerSend}
        handlerOpen={setIsOpen}
        addSelectedKeys={addSelectedKeysHandler}
      />
    </>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    emptySelectedCurrent: () =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_EMPTY }),
    addSelectedKeysHandler: (payload) =>
      dispatch({
        type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS,
        payload,
      }),
    paginator: (payload) =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_LOADING, payload }),
    selectOneById: (payload) =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT, payload }),
    addType: (type, data, id) =>
      dispatch({
        type: actionsType.ASESORIA_ADMIN_ADD_TYPE,
        payload: {
          type,
          data,
          id,
        },
      }),
  };
};

const mapStateToProps = (state) => {
  const { data, loading, current } = state.adminAsesoria;
  return {
    data,
    loading,
    current,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(AsesoriaTable);
