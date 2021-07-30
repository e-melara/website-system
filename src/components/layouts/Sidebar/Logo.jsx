import React from "react";

import Wrapper from "./Wrapper";
import LogoIcon from "../../../assets/images/logo/logo-icon.png";

function Logo() {
  return (
    <div>
      <Wrapper />
      <div className="logo-icon-wrapper">
        <a href="/#">
          <img
            className="img-fluid"
            src={LogoIcon}
            alt="imgs icon"
          />
        </a>
      </div>
    </div>
  );
}

export default Logo;
