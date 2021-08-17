import { Row } from "reactstrap";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import { Layout } from "../../components/layouts";
import { notesLoading } from "../../redux/ducks/notes";
import CardUser from "../../components/common/CardUser";
import TableNotesStudent from "./components/TableNotesStudent";

const NotePage = ({
  notes: { loading },
  requestLoading,
  auth,
  carrera,
  notes,
}) => {
  useEffect(() => {
    if (!loading) {
      requestLoading();
    }
  }, [loading, requestLoading]);

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
  const { notes } = state.notes;
  return {
    notes,
    auth: data,
    carrera,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    requestLoading: () => dispatch(notesLoading()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(NotePage);
