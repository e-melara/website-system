import React from "react";
import { AlignCenter } from "react-feather";

import LogoFile from "../../../assets/images/logo/logo.png";

const HeaderLogoWrapper = () => {
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <a href="#/">
          <img className="img-fluid" src={LogoFile} alt="Logo imgs" />
        </a>
        <div className="toggle-sidebar" checked="checked">
          <AlignCenter
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoWrapper;
