import React from "react";
import { Grid } from "react-feather";
import { useDispatch } from "react-redux";

import ultlaLogo from "../../../assets/images/logo/utla.png";
import { changeOpenCloseAction } from "../../../redux/ducks/ui";

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
          src={ultlaLogo}
          alt="imgs de logo"
          style={{ height: "35px" }}
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
