import React from "react";
import { Grid } from "react-feather";
import { useDispatch } from "react-redux";

import { changeOpenCloseAction } from "../../../redux/ducks/ui";
import LoginImageFile from "../../../assets/images/logo/logo.png";
import LoginImageDarkFile from "../../../assets/images/logo/logo_dark.png";

function Wrapper() {
  const dispatch = useDispatch();

  const handlerClickOpen = () => {
    dispatch(changeOpenCloseAction());
  };
  return (
    <div className="logo-wrapper">
      <a href="/#">
        <img
          className="img-fluid for-light"
          src={LoginImageFile}
          alt="imgs de logo"
          width="97"
        />
        <img
          className="img-fluid for-dark"
          src={LoginImageDarkFile}
          alt="imgs de logo"
          width="97"
        />
      </a>
      <div className="back-btn">
        <i className="fa fa-angle-left"></i>
      </div>
      <div
        className="toggle-sidebar"
        checked="checked"
        onClick={handlerClickOpen}
      >
        <Grid className="status_toggle middle sidebar-toggle" />
      </div>
    </div>
  );
}

export default Wrapper;
