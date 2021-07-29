import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import "./login.scss";
import LoginForm from "./LoginForm";
import { startLogin } from "../../redux/login";
import { useForm, useBandera } from "../../components/hooks";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [showHide, setShowHide] = useBandera(true);
  const [formValues, setFormValues] = useForm({
    carnet: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { carnet, password } = formValues;
    dispatch(startLogin(carnet, password));
  };

  return (
    <>
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
