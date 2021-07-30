import React from "react";
import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Maximize, User, Settings, LogIn } from "react-feather";

import { logout } from "../../../redux/login";
import { changeTheme } from "../../../redux/ui";
import ImageProfile from "../../../assets/images/profile/profile.jpg";

const HeaderRight = () => {
  const dispatch = useDispatch();
  
  const { ui, auth } = useSelector(state => state)
  const {data} = auth

  const handlerClickMode = () => {
    dispatch(changeTheme());
  };

  const handlerLogout = () => {
    dispatch(logout())
  }

  return (
    <Col className="nav-right pull-right right-header p-0">
      <ul className="nav-menus">
        <li>
          <div className="mode" onClick={handlerClickMode}>
            <i className={ui.theme === 'ligth' ? "fa fa-moon-o" : "fa fa-lightbulb-o"}></i>
          </div>
        </li>
        <li className="maximize">
          <a className="text-dark" href="#!">
            <Maximize />
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
                {data.apellidos} <i className="middle fa fa-angle-down"></i>
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
            <li onClick={handlerLogout}>
              <a href="#/" >
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

export default HeaderRight;
