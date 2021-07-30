import React from "react";

import LoginImageFile from "../../../assets/images/logo/logo.png";
import LoginImageDarkFile from "../../../assets/images/logo/logo_dark.png";

function Wrapper() {
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
      <div className="toggle-sidebar" checked="checked">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-grid status_toggle middle sidebar-toggle"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </div>
    </div>
  );
}

export default Wrapper;
