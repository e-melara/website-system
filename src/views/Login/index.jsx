import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import "./login.scss";
import LoginForm from "./LoginForm";
import Loading from "../../components/common/Loading";

import { actionLogin } from "../../redux/ducks/login";
import { useForm, useBandera } from "../../components/hooks";

const LoginPage = ({ loading, login }) => {
  const [showHide, setShowHide] = useBandera(true);
  const [formValues, setFormValues] = useForm({
    carnet: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { carnet, password } = formValues;
    login(carnet, password);
  };

  return (
    <>
      {loading && <Loading />}
      <Container fluid={true}>
        <Row>
          <Col xl={7} className="b-center bg-size login__image_cover"></Col>
          <Col xl={5} className="p-0">
            <div className="login-card login__image_backgroun_bg">
              <div>
                <LoginForm
                  showHide={showHide}
                  onSubmit={handlerSubmit}
                  inputValues={formValues}
                  onChangeInput={setFormValues}
                  showHideFunc={(e) => setShowHide()}
                />
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

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(actionLogin(username, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
