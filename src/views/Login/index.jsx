import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import "./login.scss";
import LoginForm from "./LoginForm";
import Loading from "../../components/common/Loading";

const LoginPage = ({ loading }) => {
  return (
    <>
      {loading && <Loading />}
      <Container fluid={true}>
        <Row>
          <Col xl={7} className="b-center bg-size login__image_cover"></Col>
          <Col xl={5} className="p-0">
            <div className="login-card login__image_backgroun_bg">
              <div>
                <LoginForm loading={loading} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
  };
}

export default connect(mapStateToProps)(LoginPage);
