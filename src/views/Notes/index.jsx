import { Row } from "reactstrap";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import { Layout } from "../../components/layouts";
import { checking } from "../../redux/ducks/notes";
import CardUser from "../../components/common/CardUser";
import TableNotesStudent from "./components/TableNotesStudent";

const NotePage = ({ loading, auth, carrera, notes, validated }) => {
  useEffect(() => {
    if (!loading) {
      validated(loading);
    }
  }, [loading, validated]);

  return (
    <Layout>
      <Row className="asesoria third-news-update">
        <CardUser carrera={carrera} user={auth} />
        <TableNotesStudent notes={notes} />
      </Row>
    </Layout>
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
