import React from "react";
import { AlignCenter } from "react-feather";

import utlaLogo from "../../../assets/images/logo/utla.png";

const HeaderLogoWrapper = () => {
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <a href="#/">
          <img className="img-fluid" src={utlaLogo} alt="Logo imgs" />
        </a>
        <div className="toggle-sidebar" checked="checked">
          <AlignCenter
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoWrapper;
