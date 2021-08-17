import { Col } from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Maximize } from "react-feather";
import { User, Settings, LogIn } from "react-feather";

import { logout } from "../../../redux/ducks/login";
import { actionOnChangeTheme } from "../../../redux/ducks/ui";
import ImageProfile from "../../../assets/images/profile/profile.jpg";
import { fullScreen, changeUiThemeDarkOrLigth } from "../../../utils/ui";

const HeaderRight = ({ auth, logout, ui, themeOnChange }) => {
  const { theme } = ui;
  const { data, perfil } = auth;

  useEffect(() => {
    changeUiThemeDarkOrLigth(theme);
  }, [theme]);

  const handlerClickFullView = (e) => {
    e.preventDefault();
    fullScreen();
  };

  const handlerClickDarkOnLigth = () => {
    themeOnChange(theme);
  };

  const c = classNames({
    fa: true,
    "fa-moon-o": theme === "ligth",
    "fa-lightbulb-o": theme === "dark",
  });

  return (
    <Col className="nav-right pull-right right-header p-0">
      <ul className="nav-menus">
        <li onClick={handlerClickDarkOnLigth}>
          <div className="mode">
            <i className={c}></i>
          </div>
        </li>
        <li>
          <a href="#/" onClick={handlerClickFullView}>
            <div className="text-dark">
              <Maximize />
            </div>
          </a>
        </li>
        <li className="profile-nav onhover-dropdown p-0 me-0">
          <div className="media profile-media">
            <img
              className="b-r-10"
              src={ImageProfile}
              alt="imagen de perfil del usuario"
            />
            <div className="media-body">
              <span>{data.nombres}</span>
              <p className="mb-0 font-roboto">
                {perfil} <i className="middle fa fa-angle-down"></i>
              </p>
            </div>
          </div>
          <ul className="profile-dropdown onhover-show-div active">
            <li>
              <a href="#/">
                <User />
                <span>Cuenta </span>
              </a>
            </li>
            <li>
              <a href="#/">
                <Settings strokeLinejoin="round" strokeLinecap="round" />
                <span>Ajustes</span>
              </a>
            </li>
            <li onClick={logout}>
              <a href="#/">
                <LogIn />
                <span>Salir</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </Col>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    themeOnChange: (theme) => dispatch(actionOnChangeTheme(theme)),
  };
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight);
