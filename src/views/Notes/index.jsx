// import { Row } from "reactstrap";
import { Row, Col, Table, Card, Badge } from "antd";

import { connect } from "react-redux";
import React, { useEffect } from "react";

import { checking } from "../../redux/ducks/notes";
import CardUser from "../../components/common/CardUser";

const NotePage = ({ loading, auth, carrera, notes, validated }) => {
  useEffect(() => {
    if (!loading) {
      validated(loading);
    }
  }, [loading, validated]);
  const columns = [
    {
      key: "codmate",
      dataIndex: "codmate",
      title: "Codigo",
      align: 'center'
    },
    {
      key: "nommate",
      dataIndex: "nommate",
      title: "Materia",
      
    },
    {
      key: "ciclolectivo",
      dataIndex: "ciclolectivo",
      title: "Ciclo en curso",
      align: 'center'
    },
    {
      key: "estado",
      dataIndex: "estado",
      title: "Estado",
      align: 'center',
      render: (estado) => (
        <Badge
          status={estado === "APROBADO" ? "success" : "error"}
          text={estado}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[20, 0]}>
        <Col xs={8}>
          <CardUser carrera={carrera} user={auth} />
        </Col>
        <Col xs={16}>
          <Card title="Historial de notas">
            <Table
              rowKey={Math.floor(Math.random() * Date.now())}
              columns={columns}
              dataSource={notes}
              size="small"
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, carrera } = state.auth;
  const { notes, loading } = state.notes;
  return {
    notes,
    loading,
    auth: data,
    carrera,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    validated: (loading) => dispatch(checking(loading)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(NotePage);
