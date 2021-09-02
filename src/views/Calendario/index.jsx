import { connect } from "react-redux";
import React, { useEffect } from "react";
import { DatePicker, Row, Col, List } from "antd";

import { loadingEventos } from "../../redux/ducks/eventos";
import CardCalendario from "./components/CardCalendario";

const { Item } = List;
const monthFormat = 'MM-YYYY';

const Calendario = ({ data, loading, getEventos }) => {
  useEffect(()=> {
    getEventos()
  }, [getEventos])

  const handlerChange = (_, dateString) => {
    if(dateString){
      getEventos(dateString)
    }
  }

  return (
    <div className="p-4">
      <Row justify="space-between">
        <Col>
          <h3 className="ant-page-header-heading-title">
            Calendario Academico
            <span className="ant-page-header-heading-sub-title">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </span>
          </h3>
        </Col>
        <Col>
          <DatePicker
            size="large"
            picker="month"
            format={monthFormat}
            onChange={handlerChange}
            style={{ width: 210 }}
            placeholder="Seleccione el mes"
          />
        </Col>
      </Row>
      <List
      loading={loading}
        grid={{
          gutter: [16, 16],
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        style={{ paddingTop: 40 }}
        dataSource={data}
        renderItem={(record) => (
          <Item>
            <CardCalendario {...record} />
          </Item>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEventos: (payload) => dispatch(loadingEventos(payload)),
  };
};

const mapStateToProps = (state) => {
  const {data, loading} = state.eventos;
  return {
    data,
    loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendario);
