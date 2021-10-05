import * as Yup from "yup";
import { Formik } from "formik";
import classNames from "classnames";
import { connect } from "react-redux";
import React, { useState } from "react";

import { actionLogin } from "../../redux/ducks/login";

import { MessageError } from "../../components/common/MessageError";
import { BaseAssets } from "../../consts";

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
  const [showInput, setShowInput] = useState(true);
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
              src={`${BaseAssets}files/utla.png`}
              alt="looginpage"
              style={{ height: "120px" }}
            />
            <img
              className="img-fluid for-dark"
              src={`${BaseAssets}files/utla.png`}
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
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={`theme-form needs-validation`}
              >
                <h4>Ingresa a tu cuenta</h4>
                <p>Ingresa tu carnet y contraseña para loguarte</p>
                <div
                  className={classNames({
                    "form-group": true,
                    "was-invalited": true,
                    error: touched.carnet && errors.carnet,
                  })}
                >
                  <label htmlFor="carnet" className="col-form-label">
                    Carnet
                  </label>
                  <input
                    required
                    type="text"
                    name="carnet"
                    placeholder="Carnet"
                    onBlur={handleBlur}
                    value={values.carnet}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <MessageError
                    errors={errors.carnet}
                    touched={touched.carnet}
                  />
                </div>

                <div
                  className={classNames({
                    "form-group": true,
                    "was-invalited": true,
                    error: touched.password && errors.password,
                  })}
                >
                  <label htmlFor="password" className="col-form-label">
                    Carnet
                  </label>
                  <div className="form-input position-relative">
                    <input
                      required
                      name="password"
                      onBlur={handleBlur}
                      placeholder="*******"
                      value={values.password}
                      onChange={handleChange}
                      type={showInput ? "password" : "text"}
                      className="form-control"
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
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 btn btn-primary btn-lg"
                  >
                    Entrar
                  </button>
                </div>
              </form>
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
