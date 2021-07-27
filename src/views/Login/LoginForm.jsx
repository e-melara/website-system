import React from "react";
import PropTypes from 'prop-types';
import { Button, Form, Label, Input, FormGroup } from "reactstrap";


import Login from "../../assets/images/logo/login.png";

const  LoginForm = ({
  showHide,
  onSubmit,
  inputValues,
  showHideFunc,
  onChangeInput,
}) => {
  
  const { carnet, password  } = inputValues;

  return (
    <div className="login-card">
      <div>
        <div>
          <a className="logo text-start">
            <img className="img-fluid for-light" src={Login} alt="looginpage" />
          </a>
        </div>
        <div className="login-main">
          <Form className="theme-form" autoComplete='off' onSubmit={onSubmit}>
            <h4>Ingresa a tu cuenta</h4>
            <p>Ingresa tu carnet y contraseña para loguarte</p>
            <FormGroup>
              <Label className="col-form-label">Carnet</Label>
              <Input
                required
                type="text"
                name='carnet'
                value={carnet}
                placeholder="Carnet"
                onChange={onChangeInput}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Contraseña</Label>
              <div className="form-input position-relative">
                <Input
                  required
                  name='password'
                  value={password}
                  placeholder="*******"
                  onChange={onChangeInput}
                  className="form-control"
                  type={showHide ? "password" : "text"}
                />
                <div className="show-hide" onClick={showHideFunc}>
                  <span className={showHide ? "show" : ""}></span>
                </div>
              </div>
            </FormGroup>

            <FormGroup className="mb-0">
              <br />
              <Button color="primary" size="lg" className="w-100" type="submit">
                Entrar
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showHide: PropTypes.bool.isRequired,
  showHideFunc: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  onChangeInput: PropTypes.func.isRequired,
}


export default LoginForm;