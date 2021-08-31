import { Tabs } from "antd";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import "./index.scss";

import AsesoriaPage from "./Asesoria";
import TablePensum from "./components/TablePensum";
import { checking } from "../../redux/ducks/asesoria";

const { TabPane } = Tabs;

function PensumPage({ carrera, pensum, loading, verificated }) {
  useEffect(() => {
    if (!loading) {
      verificated(loading);
    }
  }, [verificated, loading]);

  return (
    <div>
      <Tabs defaultActiveKey="1" centered size="large">
        <TabPane tab="Pensum" key="1">
          <div className="p-4">
            <TablePensum pensum={pensum} carrera={carrera} />
          </div>
        </TabPane>
        <TabPane tab="Asesoria" key="2">
          <div className="p-4">
            <AsesoriaPage />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

const mapDispathToProps = (dispatch) => {
  return {
    verificated: () => dispatch(checking()),
  };
};

const mapStateToProps = (state) => {
  const { pensum, loading } = state.asesoria;
  return {
    carrera: state.auth.carrera,
    pensum,
    loading,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(PensumPage);
