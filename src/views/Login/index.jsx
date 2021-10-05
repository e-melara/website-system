import React from "react";
import { connect } from "react-redux";

import { BaseAssets } from "../../consts";

import "./login.scss";

import LoginForm from "./LoginForm";
import Loading from "../../components/common/Loading";

const LoginPage = ({ loading }) => {
  return (
    <div className="container-fluid">
      {loading && <Loading />}
      <div className="row">
        <div className="col-7 login__image_cover"  style={{
          backgroundImage: `url(${BaseAssets}files/portada.jpg)`
        }} ></div>
        <div className="col-5 p-0">
          <div className="login-card p-0"  style={{
            backgroundImage: `url(${BaseAssets}files/login_bg.jpg)`
          }}>
            <>
              <LoginForm loading={loading} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
  };
}

export default connect(mapStateToProps)(LoginPage);
