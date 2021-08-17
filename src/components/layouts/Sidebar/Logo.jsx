import React from "react";

import Wrapper from "./Wrapper";
import utlaLogo from "../../../assets/images/logo/utla.png";

function Logo() {
  return (
    <>
      <Wrapper />
      <div className="logo-icon-wrapper">
        <a href="/#">
          <img
            style={{ height: "30px" }}
            className="img-fluid"
            src={utlaLogo}
            alt="imgs icon"
          />
        </a>
      </div>
    </>
  );
}

export default Logo;
