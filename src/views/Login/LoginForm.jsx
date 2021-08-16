import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";

import { actionLogin } from "../../redux/ducks/login";

import Login from "../../assets/images/logo/login.png";
import utlaLogo from "../../assets/images/logo/utla.png";
import { useBandera } from "../../components/hooks/useBandera";
import { MessageError } from "../../components/common/MessageError";

const signInSchema = Yup.object().shape({
  carnet: Yup.string()
    .min(7, "El minimo tamaño es de 7")
    .max(10, "El maximo tamaño es 10")
    .required("El carnet es obligatorio"),
  password: Yup.string()
    .min(7, "El minimo tamaño es de 7")
    .max(10, "El maximo tamaño es 10")
    .required("El password es obligatorio"),
});

const LoginForm = ({ loading, login }) => {
  const [showInput, setShowInput] = useBandera(true);
  return (
    <div className="login-card">
      <div>
        <div></div>
        <div className="login-main">
          <a
            className="logo text-start"
            href="#/"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              className="img-fluid for-light"
              src={utlaLogo}
              alt="looginpage"
              style={{ height: "120px" }}
            />
            <img
              className="img-fluid for-dark"
              src={utlaLogo}
              alt="looginpage"
              style={{ height: "120px" }}
            />
          </a>
          <Formik
            initialValues={{ carnet: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={(values, { setSubmitting }) => {
              const { carnet, password } = values;
              login(carnet, password);
              if (!loading) setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={`theme-form needs-validation`}
              >
                <h4>Ingresa a tu cuenta</h4>
                <p>Ingresa tu carnet y contraseña para loguarte</p>
                <FormGroup
                  className={`was-invalited ${
                    touched.carnet && errors.carnet ? "error" : ""
                  }`}
                >
                  <Label className="col-form-label">Carnet</Label>
                  <Input
                    required
                    type="text"
                    name="carnet"
                    placeholder="Carnet"
                    onBlur={handleBlur}
                    value={values.carnet}
                    onChange={handleChange}
                  />
                  <MessageError
                    errors={errors.carnet}
                    touched={touched.carnet}
                  />
                </FormGroup>
                <FormGroup
                  className={`was-invalited ${
                    touched.password && errors.password ? "error" : "valid"
                  }`}
                >
                  <Label className="col-form-label">Contraseña</Label>
                  <div className="form-input position-relative">
                    <Input
                      required
                      name="password"
                      onBlur={handleBlur}
                      placeholder="*******"
                      value={values.password}
                      onChange={handleChange}
                      type={showInput ? "password" : "text"}
                    />
                    <div
                      className="show-hide"
                      onClick={() => setShowInput((e) => !e)}
                    >
                      <span className={showInput ? "show" : ""}></span>
                    </div>
                  </div>
                  <MessageError
                    errors={errors.password}
                    touched={touched.password}
                  />
                </FormGroup>
                <FormGroup className="mb-0">
                  <br />
                  <Button
                    size="lg"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100"
                  >
                    Entrar
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(actionLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
