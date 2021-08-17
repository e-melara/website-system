import React from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

import "./login.scss";

import LoginForm from "./LoginForm";
import Loading from "../../components/common/Loading";

const LoginPage = ({ loading }) => {
  return (
    <Container fluid={true}>
      {loading && <Loading />}
      <Row className="max__heigth__100vh">
        <Col xl={7} className="login__image_cover"></Col>
        <Col xl={5} className="p-0">
          <div className="login-card p-0 login__image_backgroun_bg">
            <>
              <LoginForm loading={loading} />
            </>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
  };
}

export default connect(mapStateToProps)(LoginPage);
